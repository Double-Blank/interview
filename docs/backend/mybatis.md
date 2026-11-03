# MyBatis

## 八、MyBatis / MyBatis-Plus（20 题）

### 1. MyBatis

#### 1. MyBatis 是什么？解决了什么问题？

MyBatis 是持久层框架，把 SQL 和 Java 方法对应起来。调用 Mapper 方法时，它负责设置参数、执行 SQL、把结果集映射成对象。

对比手写 JDBC，它省掉了加载驱动、获取连接、创建 `PreparedStatement`、手动 `setXxx`、遍历 `ResultSet` 和关闭资源这些样板代码。SQL 仍然由开发者编写，适合需要控制查询语句的业务。

#### 2. MyBatis 和 JDBC 有什么区别？

JDBC 是 Java 访问数据库的标准 API，所有框架最终都走它。MyBatis 是 JDBC 之上的封装。

- JDBC 要自己管理连接、语句、结果集和异常，字段和对象的赋值全是手工代码。
- MyBatis 用 XML 或注解描述 SQL，用 `#{}` 绑定参数，用 `resultMap` 或自动映射组装对象。
- 事务和连接池通常交给 Spring 和 HikariCP，MyBatis 不负责这些。

需要完全动态、框架覆盖不到的底层控制时才直接用 JDBC。业务 CRUD 用 MyBatis。

#### 3. MyBatis 和 Hibernate 有什么区别？

| | MyBatis | Hibernate / JPA |
|--|---------|-----------------|
| SQL | 开发者编写 | 根据实体自动生成，也可写 JPQL |
| 映射 | SQL 结果映射到对象 | 对象状态由持久化上下文管理 |
| 控制力 | 高，复杂 SQL 清晰 | 简单 CRUD 快，复杂 SQL 往往更绕 |
| 缓存 | 一级、二级缓存，默认不那么“自动” | 一级缓存和脏检查更重 |
| 学习成本 | 会 SQL 就能用 | 要理解持久化上下文、懒加载、脏检查 |

国内业务系统查询复杂、表结构明确，更常见 MyBatis 或 MyBatis-Plus。领域模型简单、希望少写 SQL 时，JPA 更合适。

#### 4. MyBatis 的核心组件有哪些？

- `SqlSessionFactory`：由配置创建，应用里通常只有一个，用来生产 `SqlSession`。
- `SqlSession`：一次会话，提供执行 SQL 的方法。它不是线程安全的。Spring 集成后由 `SqlSessionTemplate` 按事务绑定。
- `Mapper` 接口：业务代码面对的接口。MyBatis 用 JDK 动态代理生成实现。
- `MappedStatement`：一条 SQL 的完整描述，包含 id、SQL、参数映射和结果映射。
- `Executor`：执行器，负责缓存、事务和真正调用 `StatementHandler`。
- `StatementHandler`、`ParameterHandler`、`ResultSetHandler`：创建语句、设参数、处理结果集。

#### 5. MyBatis 的执行流程是什么？

1. 启动时读取配置和 Mapper XML，解析成 `MappedStatement`，放进 `Configuration`。
2. 业务调用 Mapper 接口方法。
3. Mapper 代理根据接口全名和方法名找到对应的 `MappedStatement`。
4. `SqlSession` 交给 `Executor`。
5. 参数处理器把 `#{}` 替换成 `?` 并设置 JDBC 参数。
6. 执行 SQL，结果处理器按 `resultType` 或 `resultMap` 转成对象。
7. 如果当前有 Spring 事务，连接在事务结束时提交或回滚；没有事务则按配置自动提交。

#### 6. MyBatis 如何实现 SQL 映射？

有两种写法。

- XML：`namespace` 必须是 Mapper 接口全限定名，`select` / `insert` 的 `id` 必须是方法名。
- 注解：在方法上写 `@Select`、`@Insert`。SQL 短时可以，动态 SQL 一复杂就难维护，项目里更常见 XML。

返回单个对象用 `resultType`。列名和属性名不一致、一对多、嵌套对象时用 `resultMap`。开启驼峰转换后，`user_name` 可以自动对上 `userName`。

#### 7. `#{}` 和 `${}` 有什么区别？

- `#{}` 是预编译参数，会变成 `?`，值通过 `PreparedStatement` 设置。用户输入当数据，不会改变 SQL 结构。
- `${}` 是字符串替换，原样拼进 SQL。语句结构在解析前就已经变了，不能预编译这个位置。

排序字段、表名这种不能作为占位符的地方才会用 `${}`，并且必须用白名单，不能直接拼前端传来的字符串。普通条件、id、名称全部用 `#{}`。

#### 8. MyBatis 如何防止 SQL 注入？

使用 `#{}`。它走 JDBC 预编译，恶意输入只会变成某个字段的值，不会变成额外的 SQL 片段。例如用户名传入 `' or 1=1 --`，也只是一条不相等的字符串。

`${}` 不做预编译，把用户输入直接拼进去就会注入。动态排序写成 `${orderBy}` 时，要先判断值是不是 `create_time`、`id` 这类允许的列。日志里可以打印 SQL，但不能为了方便把所有条件改成 `${}`。

#### 9. MyBatis 中 `resultType` 和 `resultMap` 有什么区别？

`resultType` 指定结果类，按列名和属性名自动映射，适合单表、字段对应得上的查询。

`resultMap` 自己定义列和属性的关系，可以处理别名、嵌套对象、一对一和一对多。一对多要设 `id`，否则多行结果会映射成重复的主对象。`resultType` 和 `resultMap` 不能在同一条语句上同时用。

能自动映射就用 `resultType`。关联查询、列名对不上时用 `resultMap`。

#### 10. MyBatis 如何实现动态 SQL？

XML 里用动态标签，按条件拼接 SQL：

- `if`：某个字段有值才加条件。
- `choose` / `when` / `otherwise`：多选一。
- `where`：自动去掉多余的 `AND` / `OR`，没有条件时不生成 `WHERE`。
- `set`：更新语句里自动处理逗号。
- `foreach`：`IN` 列表或批量插入。
- `trim`：自定义前后缀和要去掉的多余关键字。

```xml
<select id="search" resultType="com.example.user.User">
  SELECT id, username FROM user
  <where>
    <if test="username != null and username != ''">
      AND username = #{username}
    </if>
    <if test="status != null">
      AND status = #{status}
    </if>
  </where>
</select>
```

仍然使用 `#{}`。不要在 Java 里手写一整段 SQL 字符串再传给 `${}`。

### 2. MyBatis-Plus

#### 11. MyBatis-Plus 是什么？

MyBatis 的增强工具，不改变 MyBatis 本身，在它上面提供通用 CRUD、条件构造器、分页、逻辑删除和字段自动填充。原有的 XML 和自定义 SQL 继续有效。它不是新的 ORM，复杂查询仍然可以自己写 SQL。

#### 12. MyBatis-Plus 相比 MyBatis 有什么优势？

- `BaseMapper` 内置插入、按 id 查询、更新、删除，单表不用写 XML。
- `Wrapper` 用 Java 代码拼条件，简单查询不用来回改 XML。
- 分页插件统一处理 count 和 limit。
- 逻辑删除、自动填充创建时间和更新时间、乐观锁插件都是现成的。
- 代码生成器可以根据表生成 Entity、Mapper、Service。

复杂报表、多表关联、性能敏感的 SQL 仍然手写，Plus 不替代这部分。

#### 13. `BaseMapper` 有什么作用？

通用 Mapper 接口。业务 Mapper 继承 `BaseMapper<User>` 后，不用写方法就有 `insert`、`deleteById`、`updateById`、`selectById`、`selectList`、`selectPage` 等。

```java
public interface UserMapper extends BaseMapper<User> {
    List<User> selectActiveWithOrders();
}
```

自定义方法照常配 XML。`BaseMapper` 只覆盖单表和能用 Wrapper 表达的操作。

#### 14. `IService` 和 `BaseMapper` 有什么区别？

`BaseMapper` 在持久层，一个方法对应一次数据访问，例如 `selectById`。

`IService` / `ServiceImpl` 在业务层，对 Mapper 再包一层，提供 `save`、`saveBatch`、`getById`、`page`、`lambdaQuery` 等，批量操作会分批。Service 还可以加事务和业务校验。

Controller 应调用自己的 Service，而不是为了省事直接注入 `BaseMapper`。通用 `IService` 只作为 Service 实现类的父类，业务规则写在自己的方法里。

#### 15. `QueryWrapper` 和 `LambdaQueryWrapper` 有什么区别？

两者都用来拼查询条件。`QueryWrapper` 用字符串列名：`eq("user_name", name)`。列名写错要到运行时才发现。

`LambdaQueryWrapper` 用方法引用：`eq(User::getUserName, name)`。重构字段名时编译器能发现，也能避免拼错列。有 Lambda 条件时优先用它。`UpdateWrapper` 和 `LambdaUpdateWrapper` 是同样的区别。

列名和数据库列的对应关系来自实体注解 `@TableField`。没加注解时按驼峰转下划线。

#### 16. MyBatis-Plus 如何实现分页查询？

注册分页插件，然后用 `Page` 对象查询。

```java
MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));

Page<User> page = new Page<>(current, size);
Page<User> result = userMapper.selectPage(page, wrapper);
```

插件会先查总数，再给原 SQL 加 `LIMIT`。返回里有 `records`、`total`、`current`、`size`。自定义 XML 分页时，方法第一个参数放 `Page`，Plus 会拦截这条 SQL。页码从 1 开始。`size` 要设上限，避免一次拉全表。

#### 17. MyBatis-Plus 如何实现逻辑删除？

表上留一个删除标记，例如 `deleted`。实体字段加 `@TableLogic`，配置未删除值 0、已删除值 1。

之后调用 `deleteById` 实际执行的是 `UPDATE ... SET deleted = 1`。`select` 和 `update` 会自动带上 `deleted = 0`。唯一索引如果只建在业务字段上，逻辑删除后的行仍会占用唯一值，需要把删除标记放进唯一索引，或删除时改写唯一字段。

查已删除数据、物理清理要单独写 SQL，绕过逻辑删除条件。

#### 18. MyBatis-Plus 如何实现自动填充字段？

实体字段加 `@TableField(fill = FieldFill.INSERT)` 或 `INSERT_UPDATE`。再写一个 `MetaObjectHandler`：

```java
@Component
public class AuditFillHandler implements MetaObjectHandler {
    public void insertFill(MetaObject metaObject) {
        strictInsertFill(metaObject, "createTime", LocalDateTime.class, LocalDateTime.now());
        strictInsertFill(metaObject, "updateTime", LocalDateTime.class, LocalDateTime.now());
    }
    public void updateFill(MetaObject metaObject) {
        strictUpdateFill(metaObject, "updateTime", LocalDateTime.class, LocalDateTime.now());
    }
}
```

插入时填创建时间和更新时间，更新时只填更新时间。这只对 Plus 的插入和更新方法生效。自己写的 XML 更新不会走这个填充，XML 里要自己维护这些列，或者统一走 Plus 的更新 API。

#### 19. MyBatis-Plus 如何实现条件查询？

简单条件用 `LambdaQueryWrapper`：`eq`、`like`、`between`、`in`、`ge`、`orderByDesc`。字段为空时不加条件，用带 condition 的重载：`eq(status != null, User::getStatus, status)`。

多数字段可选的列表查询，把条件集中在一个方法里构造 Wrapper，不要把 Wrapper 传到 Controller。关联查询、子查询、数据库函数复杂时，写 XML，不用硬用 Wrapper 拼很长的一段。

#### 20. 使用 MyBatis-Plus 是否意味着不需要编写 SQL？

不需要为每个单表 CRUD 写 SQL，不代表项目里不用写 SQL。

这些情况要自己写：

- 多表关联、报表、统计。
- 需要指定索引、批量特殊更新、数据库方言函数。
- 一次更新很多行，又要避免先查后改。
- Wrapper 已经长到难以读。

Plus 生成的 SQL 也要看执行计划。分页深翻、`SELECT *`、缺少条件的 `selectList` 都会扫全表。会用通用方法，也要能读懂它发出的 SQL。
