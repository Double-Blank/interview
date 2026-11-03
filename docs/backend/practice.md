# 工程实践

## 九、Maven（10 题）

#### 1. Maven 是什么？主要解决什么问题？

Maven 是 Java 项目的构建和依赖管理工具。它用 `pom.xml` 描述项目，按约定的目录编译、测试、打包，并从仓库下载依赖。

它解决三件事：第三方 jar 和版本不用手工拷贝；构建步骤统一，换一台机器也能打出同样的包；多模块项目可以一起编译、按依赖顺序安装。

#### 2. Maven 的生命周期有哪些？

三套独立生命周期：

- `clean`：清理上一次构建，阶段是 pre-clean、clean、post-clean。
- `default`：真正的构建。主要阶段有 validate、compile、test、package、verify、install、deploy。
- `site`：生成项目站点。

执行后面的阶段时，同一生命周期里它前面的阶段都会执行。`package` 会先 compile 和 test。`clean` 不属于 default，所以 `mvn clean package` 要分开写。

#### 3. `clean`、`compile`、`test`、`package`、`install` 分别有什么作用？

- `clean`：删除 `target` 目录。
- `compile`：编译 `src/main/java` 到 `target/classes`，不跑测试。
- `test`：编译并运行测试代码。
- `package`：打成 jar 或 war，放到 `target`。Spring Boot 可执行包是这一步由插件打出来的。
- `install`：把包安装到本地仓库 `~/.m2`，同机器的其他模块可以依赖它。
- `deploy`：再进一步，上传到远程私服。

#### 4. Maven 的依赖管理机制是什么？

依赖写在 `pom.xml` 的 `dependencies` 里，用 `groupId`、`artifactId`、`version` 定位。Maven 先查本地仓库，没有再按 `settings.xml` 的镜像去远程仓库下载，并写入本地仓库。

每个依赖有范围：`compile` 默认，编译和运行都要；`provided` 编译需要、运行由容器提供；`runtime` 运行才要；`test` 只给测试。传递过来的依赖也可以用 `<exclusions>` 排除。

#### 5. 什么是传递依赖？

A 依赖 B，B 依赖 C，那么 A 的类路径上也会有 C，不用在 A 里再声明一次。这让引入 Spring Boot Starter 时能自动带上 Tomcat、Jackson 等。

传递依赖的范围会变化。例如 B 用 `compile` 依赖 C，C 会传递给 A；B 只用 `test` 依赖 C，则不会传递给 A。不想要某个传递依赖时，显式排除。

#### 6. 什么是依赖冲突？

同一个库通过不同路径出现了不同版本。例如 Spring 带了 `guava 31`，另一个 SDK 带了 `guava 20`。类路径最终只能有一个版本。用错版本会在编译期缺少方法，或运行期 `NoSuchMethodError`、`ClassNotFoundException`。

`mvn dependency:tree` 可以看是哪条路径引进来的。

#### 7. Maven 如何解决依赖版本冲突？

两条规则：

- 路径最短者优先。直接依赖优先于传递依赖。
- 路径长度相同时，`pom.xml` 里先声明的优先。

这个结果不一定是你想要的版本。稳妥做法是在父 POM 的 `dependencyManagement` 里锁定版本，或在当前模块直接声明正确版本。Spring Boot 的 parent 已经管理了官方依赖的版本，自己再引入这些库时通常不用写 version。

#### 8. `dependencyManagement` 和 `dependencies` 有什么区别？

`dependencies` 是真正引入依赖，当前模块和它的子模块（如果传递）都会用到。

`dependencyManagement` 只声明版本和范围，不真正引入。子模块在自己的 `dependencies` 里写这个依赖时可以省略版本，从而全项目使用同一版本。父 POM 和 `import` 类型的 BOM 都用这个机制。Spring Boot parent 锁定版本，业务模块再按需添加依赖。

#### 9. Maven 的 `pom.xml` 文件包含哪些重要配置？

- `modelVersion`、`groupId`、`artifactId`、`version`、`packaging`：项目坐标和打包类型。
- `parent`：继承 Spring Boot parent 或公司父 POM。
- `properties`：Java 版本、编码、自己定义的版本号。
- `dependencyManagement` 和 `dependencies`。
- `build` / `plugins`：编译器、Spring Boot 打包插件、测试插件。
- `profiles`：不同环境的构建参数。环境配置更常见还是放在 `application-dev.yml`，而不是全部写进 profile。
- `modules`：多模块时的子模块列表。

#### 10. Maven 如何配置国内镜像仓库？

在用户目录 `~/.m2/settings.xml` 配置 `mirror`，构建时走国内镜像，例如阿里云公共仓库。`mirrorOf` 设为 `*` 表示所有仓库请求都走这个镜像。

```xml
<mirrors>
  <mirror>
    <id>aliyun</id>
    <mirrorOf>*</mirrorOf>
    <url>https://maven.aliyun.com/repository/public</url>
  </mirror>
</mirrors>
```

公司有私服时，`mirrorOf` 不要用 `*` 把私服也替换掉，应把中央仓库镜像和私服仓库分开配。镜像配在 `settings.xml`，不要写进每个项目的 `pom.xml`。

## 十、RESTful API 与后端工程实践（25 题）

### 1. HTTP 与 RESTful API

#### 1. 什么是 RESTful API？

一种用 HTTP 资源来组织接口的风格。URL 表示资源，请求方法表示动作，状态码表示结果。例如获取用户是 `GET /users/1`，创建用户是 `POST /users`，而不是 `POST /getUser` 或 `POST /createUser`。

它是约定，不是协议。项目里只要资源命名、方法、状态码和响应体一致，就算落地了 REST。不必为了“纯 REST”把复杂动作用别扭的 URL 表达，搜索、登录这类动作可以用 `POST /login`。

#### 2. RESTful API 的设计原则有哪些？

- URL 用名词复数表示资源：`/users`、`/users/{id}/orders`。
- 用 HTTP 方法表示动作，不把动词放进路径。
- 用状态码区分成功、参数错误、未认证、没权限、不存在和服务器错误。
- 过滤、排序、分页放 query：`/users?status=1&page=1&size=20`。
- 无状态：登录态放 token，不依赖服务器会话。
- 响应结构统一，错误信息能让前端直接展示或定位。
- 幂等的操作保证重复调用结果一致。

#### 3. GET、POST、PUT、PATCH、DELETE 分别有什么作用？

- `GET`：查询，不修改数据。
- `POST`：创建资源，或提交一个动作。
- `PUT`：整体替换一个资源，客户端要提交完整新表示。
- `PATCH`：部分更新，只提交变化的字段。
- `DELETE`：删除。

GET 和 DELETE 一般没有请求体。创建成功可以返回 201 和新资源的 id。

#### 4. GET 和 POST 有什么区别？

GET 的参数在 URL 上，长度有限，会出现在访问日志和浏览器历史里，不能放密码。它应是只读、幂等、可缓存的。

POST 的数据在请求体里，适合创建、登录、上传和无法用查询表达的操作。POST 不保证幂等，重复提交可能创建多条。GET 请求可以被浏览器直接发起，不能用 GET 做删除或转账。

#### 5. PUT 和 PATCH 有什么区别？

PUT 是替换。客户端提交资源的完整内容，服务器用它覆盖原资源。没传的字段应按“清空”或“使用默认”理解，而不是保留原值。对同一个 URL 多次 PUT 同一份数据，结果相同，所以 PUT 幂等。

PATCH 是局部修改。只传要改的字段，其他字段保持不变。语义由接口约定，例如只更新昵称。PATCH 是否幂等取决于补丁内容，JSON 局部更新一般设计成幂等。

#### 6. HTTP 常见状态码有哪些？

- 200：成功，响应里有数据。
- 201：已创建。
- 204：成功，没有响应体，例如删除。
- 400：请求参数不合法。
- 401：未登录或 token 无效。
- 403：已登录但没有权限。
- 404：资源不存在。
- 405：方法不允许。
- 409：冲突，例如用户名已存在。
- 429：请求过多，被限流。
- 500：服务器未处理的异常。
- 502 / 504：网关错误或上游超时。

业务错误码可以再放在响应体里，HTTP 状态码仍然要语义正确，不要所有失败都返回 200。

#### 7. HTTP 和 HTTPS 有什么区别？

HTTPS 是 HTTP 跑在 TLS 上。传输内容加密，中间人不能直接看到请求体；证书用来确认服务器身份；完整性校验防止内容被篡改。

HTTP 默认 80，HTTPS 默认 443。登录、token、个人信息必须走 HTTPS。证书过期或域名不匹配时浏览器会拦截。后端看到的协议可能是网关解密后的 HTTP，业务服务要信任代理转发的 `X-Forwarded-Proto`，但这个头只能由自己的网关写入。

#### 8. 什么是幂等性？

同一个操作执行一次和执行多次，对服务器状态的影响相同。调用方因为超时重试时，不会重复扣款、重复下单。

幂等说的是服务器状态，不是每次响应字节都一样。`GET /users/1` 两次都返回当前用户，中间被人改了资料，两次响应可以不同，这个 GET 仍然是幂等的，因为它自己没改数据。

#### 9. 哪些 HTTP 请求方法具有幂等性？

GET、HEAD、OPTIONS、PUT、DELETE 按 HTTP 语义是幂等的。POST 和 PATCH 不要求幂等。

DELETE 删除同一个资源多次，结果都是资源不存在，所以幂等。POST 创建订单如果实现得不好，重试会生成多张订单。需要重试的 POST 要用幂等键：客户端带 `Idempotency-Key`，服务器记录这个键对应的结果，重复请求直接返回第一次的结果。

#### 10. 如何设计统一的 API 响应结构？

成功和失败用同一层包装，前端只按一个格式解析。

```json
{
  "code": 0,
  "message": "ok",
  "data": {}
}
```

- `code`：业务码，0 表示成功。和 HTTP 状态码分工，HTTP 表示类别，业务码表示具体原因。
- `message`：给用户或调用方看的说明。
- `data`：成功时的数据，失败时为 null。分页时 `data` 里再放 `list`、`total`、`page`、`size`。

字段错误可以加 `errors: [{ field, message }]`。不要有的接口直接返回数组，有的接口返回包装对象。时间格式、空列表和 null 的约定也要统一，空列表返回 `[]` 而不是 null。

### 2. 参数校验与异常处理

#### 11. 后端为什么需要进行参数校验？

前端校验挡不住直接调接口、旧版本客户端和伪造请求。后端是最后一道边界。

校验保证进 Service 的数据满足业务前提：必填、长度、格式、范围。非法参数尽早返回 400，避免写坏数据库或在深层抛出难懂的 SQL 异常。权限和“是不是自己的资源”也要在后端检查，不能只校验格式。

#### 12. 前端校验和后端校验有什么区别？

前端校验为了体验，没填用户名就不必等接口返回。它运行在用户自己的环境里，可以被绕过。

后端校验为了正确和安全，必须对每一次请求执行。两边规则应一致，但后端规则才是权威。后端不能假设前端已经过滤过 XSS、SQL 或负数页码。

#### 13. Spring Validation 是什么？

Bean Validation（Jakarta Validation）在 Spring 里的集成。在 DTO 字段上加约束注解，在 Controller 参数上加 `@Valid` 或 `@Validated`，请求进来后、进方法体之前完成校验。

Spring Boot 引入 `spring-boot-starter-validation` 后即可使用。校验失败抛 `MethodArgumentNotValidException` 或 `ConstraintViolationException`，由统一异常处理转成 400。Service 里要校验方法参数时，类上加 `@Validated`，因为这依赖 AOP 代理。

#### 14. `@NotNull`、`@NotBlank`、`@NotEmpty` 有什么区别？

- `@NotNull`：不能是 null。字符串可以是 `""`，集合可以是空集合。
- `@NotEmpty`：不能是 null，且长度或 size 大于 0。适用于字符串、集合、数组、Map。字符串 `" "` 可以通过，因为长度是 1。
- `@NotBlank`：只用于字符串。不能是 null，trim 之后也不能是空。用户名、标题用这个。

数值用 `@NotNull` 加 `@Min`、`@Max`。字符串用 `@NotBlank` 加 `@Size` 或 `@Pattern`。

#### 15. `@Valid` 和 `@Validated` 有什么区别？

`@Valid` 是 Jakarta Validation 的注解，用来触发对象校验，支持嵌套对象上继续校验。它没有分组属性。

`@Validated` 是 Spring 的注解，同样能触发校验，并且支持 `groups`。标在类上时，Spring 会为这个 Bean 生成方法参数校验的代理。

嵌套 DTO 用 `@Valid`。需要分组，或要校验 Service 方法参数时，用 `@Validated`。

#### 16. 如何实现分组校验？

定义标记接口，例如 `Create` 和 `Update`。约束注解的 `groups` 指定它属于哪一组。

```java
public interface Create {}

public class UserRequest {
    @Null(groups = Create.class)
    @NotNull(groups = Update.class)
    private Long id;

    @NotBlank(groups = {Create.class, Update.class})
    private String username;
}
```

接口上写 `@Validated(Create.class)`。不指定分组时，只校验 `Default` 组。创建不允许带 id，更新要求带 id，可以用分组区分同一个 DTO。

#### 17. `@ControllerAdvice` 有什么作用？

给多个 Controller 提供共用逻辑。最常见的是全局异常处理。还可以放 `@ModelAttribute` 和 `@InitBinder`。

`@RestControllerAdvice` 等于它再加 `@ResponseBody`，异常处理方法的返回值直接序列化成 JSON。可以用 `basePackages` 或 `assignableTypes` 限定作用范围。没有特殊需要时，一个项目一个全局 Advice 即可。

#### 18. `@ExceptionHandler` 有什么作用？

标明某个方法负责处理指定异常。它可以写在单个 Controller 里，只影响这个控制器；写在 `@ControllerAdvice` 里则全局生效。

Spring 按异常类型匹配，优先选更具体的异常。`BusinessException` 的处理器会优先于 `Exception` 的处理器。方法参数里可以注入异常对象、请求和响应。

#### 19. 如何设计统一异常处理机制？

- 业务失败抛带错误码的 `BusinessException`。
- 参数错误交给 Validation，不在 Controller 里逐个 if。
- `@RestControllerAdvice` 把异常转成统一 `Result` 和正确的 HTTP 状态。
- 未知异常记录完整堆栈和请求 id，对外只返回“系统繁忙”。
- Controller 和 Service 里不捕获后只打日志再返回 null。要么处理得了，要么继续抛。

错误响应不要包含 SQL、文件路径和异常类名。

#### 20. 如何区分业务异常和系统异常？

业务异常是规则不允许，调用方能理解和处理。用户不存在、余额不足、重复下单，返回 4xx 和明确文案，日志用 INFO 或 WARN，不必打成系统故障。

系统异常是程序或环境出了问题。空指针、数据库连不上、下游超时，返回 500，日志用 ERROR 并带堆栈，需要告警。不要把数据库异常原文返回给前端，也不要把所有业务失败都包成 500。

### 3. 前后端联调

#### 21. 前后端分离架构是什么？

浏览器里的前端应用和后端 API 分开开发、分开部署。前端负责页面和交互，通过 HTTP 调用后端 JSON 接口。后端不渲染业务页面，只提供 API、认证和数据。

两边通过接口文档协作，可以独立发布。认证常用 token，而不是把登录态存在服务端 Session 再配模板。跨域、统一响应和鉴权要提前约定。

#### 22. 前后端如何约定 API 接口规范？

写清楚 URL、方法、是否需要登录、请求参数、字段类型、是否必填、响应示例、错误码和分页格式。用 OpenAPI 或 Apifox 维护，改接口先改文档。

还要约定时间是 ISO-8601 还是时间戳、金额用分还是字符串、枚举传数字还是英文、分页页码从 1 开始。破坏性修改增加新版本或新字段，不直接改掉旧字段的含义。

#### 23. 如何解决跨域问题？

浏览器同源策略限制页面用脚本读取另一个源的响应。源由协议、域名、端口组成。前后端分离、本地前端连远程接口时就会遇到。

开发环境可以用前端 dev server 代理，让浏览器以为请求是同源。生产环境由网关或 Spring 配置 CORS，允许指定的前端源。不要用 `allowedOrigins("*")` 再同时 `allowCredentials(true)`，浏览器会拒绝。带 cookie 或 Authorization 时，源必须写明确的白名单。

服务端之间调用没有浏览器，不存在 CORS。

#### 24. 什么是 CORS？浏览器为什么会触发 OPTIONS 预检请求？

CORS（Cross-Origin Resource Sharing）是服务端通过响应头声明“哪些源可以读我的响应”。常见头有 `Access-Control-Allow-Origin`、`Access-Control-Allow-Methods`、`Access-Control-Allow-Headers`。

简单请求会直接发出，例如普通 GET。下面的情况浏览器会先发 `OPTIONS` 预检：方法是 PUT、PATCH、DELETE，`Content-Type` 是 `application/json`，或带了自定义头。预检问服务器是否允许后续的真实请求。服务器对 OPTIONS 返回允许的方法、头和源，浏览器才发真正的 POST。

预检可以加 `Access-Control-Max-Age` 缓存。Spring Security 要放行 OPTIONS，否则预检被 401，前端表现为跨域失败。

#### 25. 如何设计一个统一的后端分页接口？

请求用 `page` 和 `size`，必要时加 `sort`。`page` 从 1 开始，`size` 有默认值（例如 20）和上限（例如 100）。

```json
{
  "code": 0,
  "data": {
    "list": [],
    "total": 128,
    "page": 1,
    "size": 20
  }
}
```

查询条件走 query 或请求体，和分页参数分开。SQL 使用 `LIMIT` 和覆盖索引需要的条件，避免 `SELECT *` 后在内存里分页。深分页不要一直增大 offset，可以改成按上一页最后的 id 继续查。总数很贵时可以单独接口或做缓存。

## 十一、项目实战场景题（30 题）

### 1. 用户系统

#### 1. 如何使用 Spring Boot 实现一个用户注册接口？

`POST /users`，请求体是用户名、密码、邮箱。DTO 上校验非空和格式。Controller 只调用 `UserService.register`。

Service 里先按用户名查询，已存在则抛业务异常。密码用 BCrypt 哈希后入库，不存明文。插入用户，返回用户 id 和基本资料，不返回密码哈希。方法加事务。唯一约束仍要建在用户名上，防止并发下两个请求同时通过“先查再插”。

#### 2. 如何实现用户登录接口？

`POST /login`，提交用户名和密码。按用户名查出用户，不存在或密码不匹配都返回同一个“用户名或密码错误”，避免告诉攻击者用户是否存在。用 `PasswordEncoder.matches` 校验哈希。

通过后签发 JWT，或创建服务端 session。响应里给 token 和过期时间。连续失败要限流或锁定一段时间。登录接口本身不要把密码打进日志。

#### 3. 用户密码应该如何存储？

只存单向哈希，不能存明文，也不能用 MD5、SHA1 这种快速哈希。用 BCrypt、SCrypt 或 Argon2。BCrypt 自带盐，每次哈希结果不同，数据库不用单独一列盐。

Spring Security 的 `BCryptPasswordEncoder` 可以直接用。校验用 `matches(raw, encoded)`，不要先哈希再字符串比较。接口响应、日志、异常信息里都不出现密码和哈希。

#### 4. 如何防止用户重复注册？

数据库对用户名、邮箱加唯一索引，这是最终保证。业务上插入前先查询，给出“用户名已存在”的友好提示。

并发时两个请求可能都查到不存在，第二个插入会触发唯一约束冲突。捕获这个冲突，转换成 409 业务异常，而不是 500。前端按钮防重复只是体验，不能代替唯一索引。

#### 5. 如何实现用户信息修改和查询？

查询：`GET /users/{id}`。先判断资源是否存在，再判断当前登录用户是本人或管理员。返回 VO，去掉密码。

修改：`PATCH /users/{id}`，只接收允许修改的字段，例如昵称、头像。用户名、密码、角色不要混在这个接口里。更新时带上 `id` 和当前用户条件，`UPDATE ... WHERE id = ?`，不能只靠前端传来的字段拼 SQL。密码修改单独走旧密码校验接口。

#### 6. 如何设计用户表？

最少字段：`id`、`username`、`password_hash`、`nickname`、`email`、`status`、`create_time`、`update_time`。`username` 唯一索引。需要逻辑删除再加 `deleted`。

`id` 用雪花或数据库自增。状态用枚举，区分正常、禁用。不要把 token、最后一次请求参数这类会话数据放进用户表。手机号、邮箱如果要查重要建索引，展示时脱敏。

#### 7. 如何实现分页查询用户列表？

`GET /users?page=1&size=20&username=tom&status=1`。Service 构造条件，调用分页查询。只查列表需要的列，不要返回密码哈希。

非管理员不能查全部用户。`size` 设上限。用户名模糊查询前面加固定前缀，或者限制只有管理员能全模糊，避免 `%tom` 这种无法走索引的搜索打满数据库。返回 `list` 和 `total`。

#### 8. 如何处理用户不存在的情况？

按 id 查询结果为 null 时，抛 `BusinessException`，HTTP 404，业务码例如 `40401`，文案“用户不存在”。不要返回 200 加 `data: null`，调用方难以区分成功和失败。

这和登录失败不同。登录时用户不存在要隐藏成“用户名或密码错误”。已登录后访问某个用户资源，可以返回不存在。如果不能暴露该 id 是否存在，也可以统一返回 404，不区分没权限和不存在。

### 2. 数据库与事务

#### 9. 什么是数据库事务？

一组数据库操作作为整体：要么全部提交，要么全部回滚。转账时扣款和加款必须在同一个事务里。

ACID：

- 原子性：全部成功或全部失败。
- 一致性：事务前后满足约束，例如余额不为负。
- 隔离性：并发事务按隔离级别互不干扰。
- 持久性：提交之后宕机也不丢。

InnoDB 支持事务。MyISAM 不支持，Spring 标了 `@Transactional` 也不会有真正的回滚。

#### 10. Spring 中如何开启事务？

在 Service 方法上加 `@Transactional`。Spring Boot 在有数据源时会自动配置事务管理器，一般不用自己声明。

```java
@Transactional
public void register(UserCreateRequest request) {
    userMapper.insert(user);
    profileMapper.insert(profile);
}
```

事务应加在业务方法上，不加在 Controller 和 Mapper 上。一个事务里只放必须同时成功的写操作，不要包进外部 HTTP 调用。

#### 11. `@Transactional` 有什么作用？

它是声明式事务。Spring 用 AOP 代理这个方法：进入前从连接池拿连接并开启事务，方法正常返回则提交，抛出指定异常则回滚，最后释放连接。连接通过 `ThreadLocal` 绑定到当前线程，所以同一个事务里的多次 Mapper 调用会用同一条连接。

默认只在 `RuntimeException` 和 `Error` 时回滚。受检异常要写 `rollbackFor = Exception.class` 才会回滚。也可以设隔离级别和传播行为。

#### 12. `@Transactional` 为什么有时候会失效？

- 方法不是被 Spring 代理调用。类内部 `this.method()` 不走代理，事务不生效。
- 方法不是 `public`。基于代理的默认事务拦截不到 protected 或 private。
- 异常在方法里被 catch 后没有再抛出，代理以为成功，会提交。
- 抛出的是受检异常，又没有配置 `rollbackFor`。
- 类没有被 Spring 管理，自己 `new` 的 Service 没有代理。
- 数据库引擎不支持事务，或数据源没有事务管理器。
- 异常在另一个线程里抛出。事务绑定在调用线程上，子线程里的 SQL 不在这个事务中。

自调用问题可以把事务方法放到另一个 Bean，或通过注入自身的代理调用。

#### 13. Spring 事务的传播行为有哪些？

传播行为决定当前方法遇到已有事务时怎么办。默认 `REQUIRED`。

- `REQUIRED`：有事务就加入，没有就新建。最常用。
- `REQUIRES_NEW`：总是新建事务，挂起外层。外层回滚不影响这里已提交的内容，适合操作日志。
- `NESTED`：嵌套事务，用保存点。内层回滚可以只滚到保存点，外层仍可继续。
- `SUPPORTS`：有事务就加入，没有就以非事务执行。
- `NOT_SUPPORTED`：挂起当前事务，以非事务执行。
- `MANDATORY`：必须已有事务，否则抛异常。
- `NEVER`：必须没有事务，否则抛异常。

#### 14. 什么是事务隔离级别？

规定并发事务之间能看到多少彼此未完成或已完成的修改。SQL 标准从低到高：

- 读未提交：能读到别人没提交的数据。
- 读已提交：只能读到已提交的数据。Oracle、PostgreSQL 常见默认。
- 可重复读：同一事务里多次读同一行，结果不变。MySQL InnoDB 默认，并且用间隙锁减少幻读。
- 串行化：事务串行执行，最安全，并发最差。

Spring 用 `@Transactional(isolation = Isolation.READ_COMMITTED)` 覆盖默认。隔离级别越高，锁越多。

#### 15. 什么是脏读、不可重复读和幻读？

- 脏读：读到另一个事务还没提交的修改。对方回滚后，你读到的值从未真正存在。读未提交才会。
- 不可重复读：同一事务里两次读同一行，中间被别的事务修改并提交，两次结果不同。读已提交仍可能发生。
- 幻读：同一事务里两次按范围查询，中间别人插入了满足条件的行，第二次多出“幻影”行。它关注的是行数变化，不可重复读关注的是同一行内容变化。

#### 16. 如何保证多个数据库操作的一致性？

同一库的多个写操作放进一个本地事务，任何一步失败就整体回滚。先写数据库约束（唯一索引、非空、外键），再靠事务保证同时成功。

跨服务或跨库不能靠一个 `@Transactional`。要用可靠消息、本地消息表或 Saga 做最终一致：本地事务里写业务数据和待发送消息，提交后再发；失败则补偿。不要在一个数据库事务里调用耗时的第三方接口，占着连接不放。

### 3. 接口设计与性能

#### 17. 一个接口响应特别慢，你会如何排查？

先确认是所有接口慢还是单个接口慢，是突然慢还是一直慢。看访问日志里的耗时和 traceId。

然后分段：网关时间、应用处理时间、SQL 时间、下游 HTTP 时间。数据库慢就看慢查询和执行计划，常见是缺索引、回表多、深分页、N+1 查询。应用慢就看是不是 Full GC、线程池排队、锁等待。下游慢就给调用加超时，避免把自身线程拖死。

用 Arthas、应用日志或 APM 定位到具体方法，不要先盲目加机器。

#### 18. 如何防止接口被重复调用？

先分清是用户连点，还是超时重试。

- 前端按钮提交后禁用，这只改善体验。
- 创建类接口让客户端传幂等键，服务端把键和结果存起来，唯一索引保证只有一次成功。
- 更新用版本号或条件更新：`UPDATE ... WHERE id = ? AND version = ?`，防止旧请求覆盖新数据。
- 短时间同一用户同一动作，可以用 Redis `SETNX` 做互斥。锁要有过期时间，业务完成要释放。

支付、下单必须在服务端做幂等，不能只靠前端。

#### 19. 如何设计一个高并发接口？

先找出热点：读多还是写多，能不能接受短暂不一致。

读多：缓存热点数据，设置过期和空值缓存，防止缓存击穿时用单飞或互斥锁回源。写多：缩短事务、批量写、队列削峰，数据库做唯一约束保证正确。应用侧使用有界线程池、限流和超时。无状态服务才能水平扩展。

不要一开始就上复杂分布式方案。先保证索引、连接池、超时和限流正确，再用压测量出瓶颈。

#### 20. 如何处理批量数据导入？

上传文件后先校验格式和大小，不要在 HTTP 线程里同步导入几十万行。把任务记成“处理中”，丢给后台线程池或消息队列分批写入，例如每 500 行一个批。

每批单独事务，失败记录行号和原因，任务最终给出成功数和失败明细。大批量用 JDBC batch，而不是循环里一条条插入并每条都提交。导入接口要幂等，同一文件重复上传不能插出两份。内存里不要一次装下整个大文件。

#### 21. 如何实现接口限流？

目的是在流量超过处理能力时快速失败，保护数据库和下游。可以按 IP、用户或接口限流。

单机可用令牌桶或漏桶，Guava `RateLimiter` 或 Resilience4j 都能做。多实例部署要共用计数，用 Redis 加过期时间，或网关（Nginx、Gateway）上统一限流。超过阈值返回 429。

限流阈值按压测容量来，而不是拍一个整数。核心下单接口和查询接口应分开限制。

#### 22. 如何设计一个统一的日志记录方案？

使用 SLF4J 打日志，不要用 `System.out`。日志里带 traceId、用户 id、接口、耗时和结果码。traceId 在过滤器里从请求头读取或生成，放进 MDC，请求结束清理。

访问日志记录方法和路径，不记录密码、token、身份证号。异常日志在统一异常处理里打一次，避免每层都打同一条堆栈。用占位符 `log.info("user={}", id)`，不要字符串拼接。生产级别 INFO，排查时再开 DEBUG。日志滚动按天或按大小，集中收集到 ELK 或类似系统。

#### 23. 如何实现接口的权限控制？

认证确认“你是谁”，授权确认“你能不能做”。登录成功后发 token，过滤器校验 token 并把用户放进上下文。

接口权限可以按角色或权限码。方法上加 `@PreAuthorize("hasRole('ADMIN')")`，或自定义注解配合 AOP。数据权限要写进查询条件，例如只能查自己的订单，不能只在前端隐藏按钮。token 过期返回 401，没有权限返回 403。管理接口和用户接口分开，默认拒绝，显式授权。

#### 24. 如何处理前端传递的非法参数？

格式问题交给 Bean Validation，统一返回 400 和字段说明。业务上不合法，例如结束时间早于开始时间、状态不允许这种流转，在 Service 里检查并抛业务异常。

不要相信前端传来的用户 id、价格和角色。当前用户从 token 取，价格从数据库商品记录取。未知字段可以忽略。枚举传了无法识别的值，返回明确的参数错误，而不是写进数据库变成脏数据。

### 4. 工程化与部署

#### 25. 如何将 Spring Boot 项目打包成可执行 Jar？

使用 `spring-boot-maven-plugin`。`mvn clean package` 会在 `target` 生成可执行 jar，里面包含依赖和启动加载器。运行方式是 `java -jar app.jar`。

普通 jar 没有这个插件时，依赖不会打进去，也不能直接 `java -jar`。多模块时，可执行插件加在最终启动的那个模块上。构建时跳过测试要用 `-DskipTests`，确认测试本身是通过的再这么做。

#### 26. Spring Boot 如何配置不同环境的配置文件？

公共配置放 `application.yml`。环境差异放 `application-dev.yml`、`application-test.yml`、`application-prod.yml`。启动时用 `spring.profiles.active=prod` 选择，可以写在命令行、环境变量或启动参数里。

生产密码不要提交到仓库，用环境变量或配置中心覆盖。`spring.profiles.active` 在仓库的默认值可以是 dev，生产启动脚本必须显式指定 prod。

#### 27. `application.yml` 和 `application.properties` 有什么区别？

都是 Spring Boot 的外部配置，键的含义相同。`.properties` 是 `key=value` 平铺。`.yml` 用缩进表示层级，同一前缀不用重复写，数组也好写。

同一目录下如果两种文件都有，`.properties` 的优先级更高。一个项目里固定用一种，避免同一配置在两个文件里各写一半。YAML 对缩进敏感，tab 会导致启动失败。

#### 28. 如何配置数据库连接池？

Spring Boot 2 默认使用 HikariCP。配置 URL、用户名、密码和驱动，再设置池大小。

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/app
    username: app
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 3000
```

池不是越大越好。每个连接占用数据库资源，大小要和数据库 `max_connections`、实例数一起算。一定要设获取连接的超时，数据库不可用时请求应快速失败，而不是一直占着 Tomcat 线程。

#### 29. 如何排查 Spring Boot 项目启动失败？

看控制台里最早的 `Caused by`，不要只看最外层的 `Application run failed`。常见原因：

- 端口已被占用。
- 数据源 URL、账号错误，或数据库没启动。
- 必填配置缺失。
- Bean 创建失败、循环依赖、同一个类型有多个实现却没有指定名字。
- Mapper 扫描不到，或 XML 的 namespace 和接口不一致。
- 依赖版本冲突，启动时 `NoSuchMethodError`。

本地把日志级别暂时调高，确认 active profile 是不是自己以为的那个。

#### 30. 如何查看 Java 应用运行日志并定位异常？

先用请求时间、接口路径或 traceId 在访问日志里找到那一次调用。再在同一 traceId 下看 ERROR 日志。堆栈从上往下看应用自己的包名，框架内部的帧先跳过，定位到自己的 Service 或 Mapper 行号。

没有集中日志时，到服务器看当前日志文件，注意按天滚动后的历史文件。`OutOfMemoryError` 要同时看 GC 日志和 heap dump。不要在生产打开不设范围的 DEBUG。拿到用户 id 和参数后，确认日志里是否已经脱敏。

## 十三、面试官可能追问的综合题（15 题）

#### 1. 如果让你从零搭建一个 Spring Boot 项目，你会如何组织目录结构？

按业务模块分包，模块内部再分层。不要把所有 Controller 放进一个包、所有 Service 放进另一个包，否则一个业务会散在四处。

```text
com.example.app
  common        统一响应、异常、工具
  config        配置类
  user
    controller
    service
    mapper
    entity
    dto
```

启动类放在根包。`resources/mapper` 放 XML，`application.yml` 放配置。公共技术代码进 `common`，业务规则留在各自模块。模块之间通过 Service 调用，不跨模块直接注 Mapper。

#### 2. 为什么 Controller 不应该直接编写复杂业务逻辑？

Controller 负责接收请求、校验参数、调用业务、返回响应。把规则写进 Controller 后，同样的规则无法被别的接口、定时任务或消息消费者复用，单元测试也必须启动 Web 层。

事务、权限范围内的数据判断、调用 Mapper 的顺序，都属于 Service。Controller 保持薄，换一种入口时业务不用重写。

#### 3. Controller、Service、Mapper 三层架构分别负责什么？

- Controller：HTTP 协议。参数、状态码、VO 转换，不含业务判断。
- Service：业务规则和事务。决定能不能做、先做什么后做什么、失败怎么回滚。
- Mapper：数据访问。执行 SQL，返回实体或简单统计，不判断业务是否允许。

依赖方向只能向下：Controller 调用 Service，Service 调用 Mapper。Mapper 不调用 Service，Controller 不直接调用 Mapper。

#### 4. Entity、DTO、VO 分别是什么？为什么需要区分？

- Entity：和表对应，给持久层用，可能包含密码哈希、删除标记。
- DTO：接收请求或在内部传输，体现调用方需要提交的数据，带校验注解。
- VO：返回给前端的视图，只含需要展示的字段。

三者变化原因不同。表加了一列内部字段，不应自动出现在接口上；接口要一个组合字段，也不应改表结构去凑。对象之间用明确的转换方法，不使用把同名属性一股脑拷贝后直接返回。

#### 5. 为什么不建议直接将数据库 Entity 返回给前端？

Entity 上有密码哈希、内部状态、逻辑删除字段，直接序列化会泄露。前端还会和表结构绑死，数据库重命名一列，接口就变了。

懒加载关联在序列化时可能触发额外查询，甚至循环引用导致栈溢出。响应用 VO，缺什么字段在 VO 里显式增加。

#### 6. 一个接口从前端发起请求到数据库返回结果，完整流程是什么？

1. 前端请求经过 DNS、网关，到达 Spring Boot 内嵌 Tomcat。
2. 过滤器处理跨域、日志 traceId、解析 token。
3. `DispatcherServlet` 找到 Controller 方法，消息转换器把 JSON 转成 DTO。
4. Bean Validation 校验参数。
5. Controller 调用 Service。
6. 事务切面开启事务，Service 做业务判断并调用 Mapper。
7. MyBatis 生成预编译 SQL，从连接池拿连接执行。
8. 结果映射成 Entity，Service 转成 VO。
9. 事务提交，连接归还。
10. 响应写成统一 JSON。异常则在 `@RestControllerAdvice` 里转换。
11. 过滤器记录耗时并清理 MDC、ThreadLocal。

#### 7. 如果数据库字段发生变化，如何降低对前端接口的影响？

接口返回 VO，不返回 Entity。数据库字段只在 Mapper 和 Entity 层变化，Service 负责填到原来的 VO 字段上。

要删除或改含义时，先增加新字段，和前端一起切过去，再废弃旧字段。查询用明确列名，不写 `SELECT *`，多出来的列不会自动进响应。DTO 和 Entity 分离之后，表结构就不是接口合同。

#### 8. 如何设计统一的异常码体系？

分段编码，看到码就知道是哪类问题。例如 0 成功，400xx 参数，401xx 认证，403xx 权限，404xx 资源不存在，409xx 冲突，500xx 系统错误。模块多时可以再按业务留区间，如用户 40401、订单 40402。

每个码对应稳定的 message。文档列出码、含义和调用方是否需要特殊处理。HTTP 状态表示大类，业务码表示细节。不要今天用字符串 `"USER_NOT_FOUND"`、明天改成数字，也不要把堆栈当成错误码。

#### 9. 如何设计一个可扩展的业务模块？

一个业务一个包，对外只暴露 Service 接口。变化点用策略而不是堆 if：支付方式、通知渠道各自实现同一个接口，Spring 按名字或类型注入 `List<策略>`。

模块之间不互相访问数据库表。需要别的模块数据时调用它的 Service。配置放配置文件，不写死在代码里。新渠道优先加一个实现类，而不是改原来的核心流程。

#### 10. 如果项目中出现大量重复代码，你会如何重构？

先看重复是不是真的同一规则。偶然相似的代码硬抽成公共方法，之后会互相牵制。

确认重复后，按层次处理：相同校验放 DTO 注解或领域方法；相同查询放 Mapper；多个接口都要的日志、权限放 AOP 或过滤器；相同组装放一个转换类。抽取后的方法要有业务名字，避免 `commonUtil` 里堆无关方法。一次只重构一块，并补上原来行为的测试。

#### 11. 如何保证接口返回数据的一致性？

所有接口返回同一个 `Result` 结构，空列表和分页字段的含义不变。枚举、时间和金额的序列化在 Jackson 里全局配置。

成功和失败都走这个结构。字段名确定后不随意改名，新增字段可以，删除要先废弃。数据库里的状态值通过统一枚举映射，避免一个接口返回 `1`，另一个接口返回 `"SUCCESS"`。

#### 12. 如何设计一个通用分页组件？

请求用同一个 `PageQuery`：`page`、`size`，在 setter 或校验里限制范围。响应用 `PageResult<T>`：`list`、`total`、`page`、`size`。

Service 接收页码和查询条件，不把 MyBatis 的 `Page` 对象传到 Controller 之外的接口文档里。前端只认 `PageResult`。这样换分页实现时，接口格式不变。默认页码 1，默认大小 20，最大 100。

#### 13. 如何处理接口调用链路中的日志追踪？

入口过滤器生成或接收 `traceId`，放进 SLF4J 的 MDC，响应头也带回这个 id。日志格式里输出 `%X{traceId}`。请求结束必须清理 MDC，否则线程池复用会串日志。

调用下游时把 traceId 放进请求头。异步线程要手动把 MDC 传进去，线程池不会自动继承。有了 traceId，一次请求的 Controller、SQL 和下游调用可以串起来。

#### 14. 如何设计一个可插拔的第三方 API 调用模块？

定义自己的接口，例如 `SmsSender`，业务只依赖这个接口。每种供应商一个实现，用配置决定启用哪一个。HTTP 调用集中在实现类里，统一超时、重试和错误转换。

不要把供应商的响应 JSON 直接传给业务。失败转成自己的异常。密钥放配置中心。供应商超时不能拖住数据库事务，调用放在事务提交之后。更换供应商时只加实现和配置，不改注册、下单这些业务流程。

#### 15. 如果让你用 Spring Boot 重构一个 NestJS 项目，你会如何规划？

NestJS 的 Module、Controller、Service、依赖注入，和 Spring 的分层、Bean 注入是对应的。可以按原来的业务模块拆包，而不是按技术类型把类打散。

接口路径、请求体和响应体尽量保持不变，前端就不用一起改。DTO 校验从 `class-validator` 换成 Bean Validation。TypeORM 或 Prisma 的查询改成 MyBatis Mapper，事务从 Nest 的方式换成 `@Transactional`。守卫和拦截器分别对应 Spring Security 过滤器和 HandlerInterceptor 或 AOP。

环境变量改成 `application-{profile}.yml` 加环境变量覆盖。先迁一个读写简单的模块，把统一响应、异常和登录跑通，再迁带事务的核心流程。
