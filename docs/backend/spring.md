# Spring

## 七、Spring Boot（35 题）

### 1. Spring 基础

#### 1. Spring 框架是什么？解决了什么问题？

Spring 是 Java 平台上的开源应用框架，核心是 IoC 容器和 AOP。它把对象创建、依赖关系、事务、以及和第三方框架的整合从业务代码里拿出去。

它主要解决这些问题：

1. **对象创建和依赖耦合。** 以前一个类要用另一个类，就在代码里 `new`，换实现就要改调用方。Spring 用 IoC 和 DI，对象由容器创建并注入，业务代码只依赖接口。
2. **框架侵入。** 早期 EJB 要求业务类继承框架的类或实现框架接口。Spring 用普通 POJO，通过注解和配置把能力组装上去，类本身可以脱离容器做单元测试。
3. **横切逻辑散落。** 日志、事务、权限、监控会在每个业务方法里复制一遍。AOP 把它们抽成切面，运行时织入。
4. **事务样板代码。** 手写 JDBC 要自己开事务、提交、回滚。`@Transactional` 把事务控制和业务分开。
5. **第三方整合。** MyBatis、数据源、Web 框架的初始化代码很多。Spring 提供模板和 Starter，按约定自动装配。

#### 2. 什么是 IoC？

IoC（Inversion of Control，控制反转）是一种设计思想：对象的创建和生命周期不再由使用方用 `new` 控制，而是交给外部容器。

在 Spring 里，容器启动时根据注解或配置创建 Bean，并管理它们的依赖和销毁。业务代码需要谁，就声明依赖，不关心这个对象是什么时候、怎样被构造出来的。控制权从调用方转到了容器。

#### 3. 什么是 DI？

DI（Dependency Injection，依赖注入）是实现 IoC 的方式。容器在创建 Bean 时，把这个 Bean 需要的依赖对象传进来。

常见方式：

- 构造器注入：依赖放在构造参数里，推荐。
- Setter 注入：通过 set 方法注入，依赖可选时用。
- 字段注入：在字段上写 `@Autowired`，写起来短，但不利于测试，也不容易保证依赖完整。

#### 4. IoC 和 DI 有什么关系？

IoC 是目标，DI 是手段。IoC 说的是“谁来创建对象”这件事反过来了；DI 说的是容器具体怎样把依赖交给对象。Spring 的 IoC 容器主要通过依赖注入实现控制反转。还有一种方式是依赖查找（DL），对象自己去容器里要依赖，侵入性更强，现在很少用。

#### 5. Spring Bean 是什么？

被 Spring IoC 容器创建、装配并管理生命周期的对象。自己 `new` 出来的对象不是 Bean，容器不会给它注入依赖，AOP 也不会作用到它上面。

类上加 `@Component`、`@Service`、`@Controller`、`@Repository`，或在配置类里用 `@Bean` 方法返回对象，这个对象才会成为 Bean。

#### 6. Spring Bean 的生命周期是什么？

可以收成四个阶段：实例化、属性赋值、初始化、销毁。

1. **实例化。** 容器通过构造器或工厂方法把对象创建出来，此时依赖还没填上。
2. **属性赋值。** 解析 `@Autowired` 等，把依赖注入进去。循环依赖的提前暴露发生在这一步之前。
3. **初始化。**
   - 回调 `Aware`，例如 `BeanNameAware`、`ApplicationContextAware`。
   - `BeanPostProcessor` 的前置处理。
   - `@PostConstruct`、`InitializingBean.afterPropertiesSet`、自定义 `init-method`。
   - 后置处理。AOP 代理一般在这里生成，放进容器的往往是代理对象。
4. **销毁。** 容器关闭时调用 `@PreDestroy`、`DisposableBean.destroy` 或自定义销毁方法，用来关连接、停线程池。`prototype` 的 Bean 容器创建后就不再管销毁。

#### 7. Spring Bean 有哪些作用域？

作用域决定每次向容器要 Bean 时，拿到的是同一个还是新的。

通用：

- `singleton`：默认。容器里只有一个实例，启动时创建，之后一直复用。Service、Controller、无状态组件用这个。
- `prototype`：每次获取都新建。容器不管理它的销毁。有状态、不能共享的对象才用。

Web 环境：

- `request`：一次 HTTP 请求一个实例。
- `session`：一个用户会话一个实例。
- `application`：整个 ServletContext 一个实例。和 singleton 接近，但范围是 Web 应用而不是单个 IoC 容器。
- `websocket`：一个 WebSocket 连接一个实例。

用 `@Scope("prototype")` 修改。在 singleton 里注入 prototype 时，默认只注入一次；要每次都拿新对象，需要 `ObjectProvider` 或方法注入。

#### 8. Spring 默认 Bean 是单例还是多例？

默认单例。整个容器中同一定义只有一个实例，所有注入点拿到的是同一个对象。要多例必须显式 `@Scope("prototype")`。单例能省内存，也要求 Bean 不要在成员变量里保存请求级状态。

#### 9. 单例 Bean 是否线程安全？

Spring 不会因为 Bean 是单例就给它加锁。多个请求线程会同时进入同一个 Service 实例。

- 无状态 Bean：只有局部变量和只读依赖，线程安全。Controller、Service、Mapper 应该写成这样。
- 有状态 Bean：成员变量会被并发修改，就不安全。例如在 Service 里放一个计数器或当前用户。

处理办法：不要在单例里放可变成员；请求数据用方法参数或局部变量；必须线程隔离时用 `ThreadLocal`，用完 `remove`；确实每个调用都要独立实例时改成 `prototype`。

#### 10. `@Component`、`@Service`、`@Repository` 有什么区别？

都能被组件扫描注册成 Bean，功能上几乎一样。区别是语义和个别附加能力。

| 注解 | 分层 | 额外作用 |
|------|------|----------|
| `@Component` | 通用 | 不属于明确分层时用 |
| `@Service` | 业务层 | 表明这里是业务逻辑 |
| `@Repository` | 持久层 | 会把数据库异常转换成 Spring 的 `DataAccessException` |
| `@Controller` | 控制层 | 同时是 MVC 的处理器 |

分层注解让包结构一眼能看懂。异常转换是 `@Repository` 真正多出来的行为。

#### 11. `@Autowired` 和 `@Resource` 有什么区别？

两者都用来注入依赖。

- `@Autowired` 是 Spring 的注解，默认按类型。同类型有多个 Bean 时，再用字段名或 `@Qualifier` 按名字确定。`required = false` 时找不到就注入 null。
- `@Resource` 来自 JSR-250（`jakarta.annotation`），默认按名字，名字对不上再按类型。用 `name`、`type` 指定。

新代码优先构造器注入。一个构造器时，Spring 4.3 起可以不写 `@Autowired`。

#### 12. 构造器注入和字段注入有什么区别？

| | 构造器注入 | 字段注入 |
|--|------------|----------|
| 写法 | 依赖作为构造参数 | 字段上 `@Autowired` |
| 不变性 | 字段可以是 `final` | 不能是 `final` |
| 空依赖 | 对象一创建依赖就齐全 | 脱离容器 `new` 出来，字段是 null |
| 测试 | 直接 `new UserService(mockMapper)` | 要反射或启动容器 |
| 循环依赖 | 构造器循环依赖启动即失败 | 字段注入可以被三级缓存暂时解决，容易把设计问题藏起来 |

Spring 团队推荐构造器注入。依赖多到构造器很长，通常说明这个类职责过多。

#### 13. Spring 如何解决循环依赖？

只解决单例 Bean 的属性注入循环依赖，例如 A 的字段依赖 B，B 的字段依赖 A。构造器循环依赖解决不了。

容器里有三级缓存：

- 一级 `singletonObjects`：完全初始化好的 Bean。
- 二级 `earlySingletonObjects`：提前暴露的早期对象。
- 三级 `singletonFactories`：能生产早期引用的工厂。需要 AOP 时，工厂返回的是代理，而不是原始对象。

流程：

1. 创建 A，实例化后把 A 的工厂放进三级缓存。
2. 给 A 注入属性时发现要 B，转去创建 B。
3. B 同样实例化并放入三级缓存。B 注入 A 时，从三级缓存拿到 A 的早期引用，B 完成初始化，进入一级缓存。
4. A 拿到完整的 B，继续完成自己的初始化和 AOP，进入一级缓存。

构造器注入在 `new` 的时候就要拿到对方，对象还没创建，无法提前暴露，启动时抛 `BeanCurrentlyInCreationException`。出现循环依赖应优先拆类或改依赖方向，而不是依赖三级缓存。

#### 14. 什么是 AOP？

AOP（Aspect-Oriented Programming，面向切面编程）用来处理散落在很多方法里、又和核心业务无关的逻辑，例如日志、事务、权限。这些叫横切关注点。

没有 AOP 时，每个业务方法都要自己写开始日志、结束日志、开事务、回滚。方法一多，改一条日志格式就要改所有方法，业务代码也不干净。AOP 把这些逻辑抽到切面里，运行时通过动态代理织进目标方法。调用方调用的是代理，代理先执行增强，再调用原方法。

核心概念：

- **Aspect**：切面类，用 `@Aspect` 标注。
- **Join Point**：能插入增强的点。Spring AOP 只支持方法执行。
- **Pointcut**：哪些方法要被增强，例如 `execution(* com.example.service.*.*(..))`。
- **Advice**：增强本身。`@Before`、`@After`、`@AfterReturning`、`@AfterThrowing`、`@Around`。环绕通知最常用，可以决定是否调用原方法。
- **Proxy**：织入之后的代理对象。实现了接口时默认 JDK 动态代理，没有接口时用 CGLIB。

```java
@Aspect
@Component
public class LogAspect {
    @Around("execution(* com.example.service.OrderService.*(..))")
    public Object record(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            return joinPoint.proceed();
        } finally {
            long cost = System.currentTimeMillis() - start;
            // 记录方法名和耗时
        }
    }
}
```

同一个类内部用 `this` 调用自己的方法，不会走代理，切面不生效。

#### 15. AOP 在实际项目中有哪些应用场景？

- **日志**：`@Around` 记录操作人、参数、结果和耗时。
- **事务**：`@Transactional` 就是 AOP。方法前开启事务，正常返回提交，指定异常回滚。
- **权限**：自定义 `@RequiresPermission`，方法执行前检查当前用户。
- **性能监控**：超过阈值打慢调用日志。
- **限流和分布式锁**：方法前获取令牌或锁，失败直接拒绝。
- **多数据源**：根据注解在执行前切换主库或从库。

适合“很多方法都要做、又不想写进业务”的逻辑。一个接口独有的业务判断仍应写在 Service 里。

### 2. Spring Boot 基础

#### 16. Spring Boot 是什么？解决了 Spring 的哪些问题？

Spring Boot 不是替代 Spring 的新框架，而是在 Spring 之上的快速开发脚手架。它解决的是 Spring 时代大量 XML 或 Java 配置、版本对齐和内嵌服务器组装问题。

约定优于配置：依赖一个 Starter，就自动配好常见 Bean。自带 Tomcat，打成可执行 Jar 就能跑。还统一了外部化配置、Actuator 监控和生产就绪的默认值。业务开发仍然使用 Spring 的 IoC、AOP 和 MVC。

#### 17. Spring Boot 和 Spring MVC 有什么区别？

不是同一层的东西。

- Spring MVC 是 Web 框架，负责把 HTTP 请求分发给 Controller，完成参数绑定、校验和响应序列化。
- Spring Boot 是项目脚手架，可以引入 `spring-boot-starter-web`，里面就包含 Spring MVC。

只用 Spring MVC 时要自己配 `DispatcherServlet`、视图解析器、Jackson 和 Web 服务器。Spring Boot 把这些按默认约定配好，也可以覆盖。

#### 18. Spring Boot 的核心特性有哪些？

- 起步依赖 Starter，按功能引入一组版本匹配的依赖。
- 自动配置，根据类路径和配置决定创建哪些 Bean。
- 内嵌 Tomcat、Jetty 或 Undertow，无需单独部署 War。
- 外部化配置：`application.yml`、环境变量、命令行参数，有明确的覆盖优先级。
- Actuator：健康检查、指标、环境信息。
- 可执行 Jar，`java -jar` 直接启动。

#### 19. 什么是自动配置？

按当前项目的依赖和配置，自动注册合适的 Bean。例如类路径有数据源相关类，并且配置了 `spring.datasource.url`，就创建 `DataSource`；引入了 Web，就创建 `DispatcherServlet` 和 Jackson 转换器。

自动配置类用 `@Conditional` 系列条件控制：有某个类才生效、容器里还没有用户自定义的 Bean 才生效。用户自己定义了同类型 Bean，默认配置就会退开。它减少的是样板配置，不是禁止你自己配置。

#### 20. `@SpringBootApplication` 包含哪些注解？

它是一个组合注解，核心是三个：

- `@SpringBootConfiguration`：本质是 `@Configuration`，启动类本身也是配置类。
- `@EnableAutoConfiguration`：开启自动配置，通过 `AutoConfiguration.imports` 加载自动配置类。
- `@ComponentScan`：从启动类所在包向下扫描 `@Component` 等注解。

所以启动类要放在根包。放在子包里，扫描不到同级的其他包。

#### 21. `@Configuration` 有什么作用？

标明这个类是配置类，里面的 `@Bean` 方法会注册到容器。`@Configuration` 类本身也是 Bean，并且默认用 CGLIB 增强：同一个配置类里方法互相调用时，返回的是容器中的单例，不会每次调用都 `new` 一个新对象。

`@Component` 也能写 `@Bean` 方法，但没有这个“方法调用也走容器”的保证。Java 配置替代了以前的 XML。

#### 22. `@Bean` 和 `@Component` 有什么区别？

- `@Component` 标在自己写的类上，靠组件扫描注册。适合业务类。
- `@Bean` 标在配置类的方法上，方法返回值注册为 Bean。适合第三方库里的类，那些类不能加注解，例如 `RestTemplate`、`ObjectMapper`、数据源。

`@Bean` 可以精确控制构造过程和依赖。组件扫描更适合大量业务类，不用逐个写方法。

#### 23. Spring Boot 如何实现自动装配？

1. 启动类上的 `@EnableAutoConfiguration` 使用 `@Import(AutoConfigurationImportSelector)`。
2. Selector 读取各 jar 的 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`（Boot 2.7 之前是 `spring.factories`）。
3. 按条件注解决定每个自动配置类是否生效，例如 `@ConditionalOnClass`、`@ConditionalOnMissingBean`、`@ConditionalOnProperty`。
4. 生效的配置类再注册 `@Bean`。

自己写 Starter 时，也是提供自动配置类，并把类名写进这个 imports 文件。用 `@AutoConfigureBefore` / `After` 控制顺序。

#### 24. 什么是 Starter？

一组依赖加对应自动配置的“启动包”。业务项目只加一个依赖，就得到该能力需要的库和默认 Bean。

官方 Starter 多用 `spring-boot-starter-*`，例如 `spring-boot-starter-web`。第三方常用 `*-spring-boot-starter`，例如 `mybatis-spring-boot-starter`。

引入 MyBatis Starter 后，只要配数据源 URL、用户名和密码，`SqlSessionFactory` 和 Mapper 扫描就不用手写。Starter 里通常不要放业务代码，只放自动配置和依赖声明。

#### 25. Spring Boot 项目启动流程是什么？

1. `main` 调用 `SpringApplication.run`。
2. 判断应用类型（Servlet、Reactive），加载 `ApplicationContextInitializer` 和 `ApplicationListener`。
3. 创建 `ApplicationContext`，Web 项目一般是 `AnnotationConfigServletWebServerApplicationContext`。
4. 准备环境：读取 `application.yml`、profile、命令行参数。
5. 刷新容器：扫描 Bean、执行自动配置、处理 `BeanFactoryPostProcessor`、实例化单例 Bean。
6. 启动内嵌 Web 服务器，监听端口。
7. 回调 `CommandLineRunner` 和 `ApplicationRunner`，发布启动完成事件。

启动失败时，从异常栈最底部的 `Caused by` 看是配置、端口占用、Bean 创建失败，还是数据库连不上。

### 3. Spring MVC 请求处理

#### 26. Spring MVC 的核心组件有哪些？

- `DispatcherServlet`：前端控制器，所有请求的入口。
- `HandlerMapping`：根据 URL 找到处理器，例如哪个 Controller 方法。
- `HandlerAdapter`：真正调用处理器，屏蔽不同处理器的调用差异。
- `HandlerInterceptor`：拦截器，在处理前、处理后、完成后执行。
- `HttpMessageConverter`：请求体和响应体与 Java 对象的转换，JSON 用 Jackson。
- `ViewResolver`：解析视图名。`@RestController` 不走视图，直接写响应体。
- `HandlerExceptionResolver`：处理控制器抛出的异常。

#### 27. 什么是 DispatcherServlet？

Spring MVC 的前端控制器，是一个 Servlet。Web 容器收到请求后先到它这里。它自己不写业务，只负责找 Handler、执行拦截器、调用适配器、处理结果和异常。

Spring Boot 里由自动配置注册，默认映射 `/`。开发时几乎不用自己声明这个 Servlet。

#### 28. 一次 HTTP 请求进入 Spring MVC 后经历了什么流程？

1. 过滤器链先执行，例如编码、CORS、Spring Security。
2. `DispatcherServlet` 接收请求。
3. `HandlerMapping` 按 URL、方法找到 Controller 方法，以及匹配的拦截器。
4. 执行拦截器 `preHandle`。返回 false 则中断。
5. `HandlerAdapter` 做参数解析：路径变量、query、请求体 JSON、校验。
6. 调用 Controller 方法，再进 Service、Mapper 和数据库。
7. 返回值由消息转换器写成 JSON，或由视图解析器渲染页面。
8. 拦截器 `postHandle`，请求完成后 `afterCompletion`。
9. 方法或下层抛出的异常交给异常解析器，例如 `@ExceptionHandler`。

#### 29. `@Controller` 和 `@RestController` 有什么区别？

`@Controller` 是页面控制器，方法默认返回视图名。要返回 JSON，每个方法还得加 `@ResponseBody`。

`@RestController` 等于 `@Controller` 加 `@ResponseBody`，类里所有方法的返回值都直接序列化进响应体。前后端分离的接口用 `@RestController`。

#### 30. `@RequestMapping` 有什么作用？

把 HTTP 请求映射到方法或类。可以指定 path、method、params、headers、consumes 和 produces。标在类上是公共前缀，标在方法上是具体接口。

`@GetMapping`、`@PostMapping` 等都是它的窄化注解，已经写死了请求方法，读起来更明确。

#### 31. `@GetMapping` 和 `@PostMapping` 有什么区别？

对应 GET 和 POST。

- GET 用来查询，参数在路径或 query 里，应保证安全、可缓存、幂等，不改服务器状态。
- POST 用来创建或提交动作，参数通常在请求体，不要求幂等。

同一个路径可以同时有 GET 和 POST，映射到不同方法。用错方法会返回 405。

#### 32. `@PathVariable` 和 `@RequestParam` 有什么区别？

- `@PathVariable` 取路径里的一段：`/users/{id}` 对应 `@PathVariable Long id`。资源标识放这里。
- `@RequestParam` 取 query 或表单字段：`/users?name=tom` 对应 `@RequestParam String name`。过滤、分页、可选条件放这里。

路径变量通常必填。`@RequestParam` 可以用 `required = false` 或 `defaultValue`。

#### 33. `@RequestBody` 有什么作用？

把请求体反序列化成 Java 对象，最常见是 JSON 到 DTO。由 `HttpMessageConverter` 根据 `Content-Type` 选择转换器。

一个方法里请求体只能读一次，所以通常只有一个 `@RequestBody`。校验时写成 `@Valid @RequestBody UserCreateRequest request`。它和 `@RequestParam` 不同，后者不读 JSON 体。

#### 34. `@ResponseBody` 有什么作用？

把方法返回值交给消息转换器，直接写入 HTTP 响应，而不是当成视图名去找模板。返回对象时，Spring Boot 默认用 Jackson 序列化成 JSON，并设置 `Content-Type: application/json`。

`@RestController` 已经包含这个注解。返回 `String` 也会被当成 JSON 字符串写出，不是页面。

#### 35. Spring MVC 如何实现参数校验和统一异常处理？

参数校验用 Bean Validation。DTO 字段加 `@NotNull`、`@NotBlank`、`@Email` 等，Controller 参数前加 `@Valid` 或 `@Validated`。校验失败会抛 `MethodArgumentNotValidException`（请求体）或 `BindException`（表单、query）。

统一异常用 `@RestControllerAdvice`：

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result<Void> handleValid(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldError().getDefaultMessage();
        return Result.fail(400, message);
    }

    @ExceptionHandler(BusinessException.class)
    public Result<Void> handleBusiness(BusinessException e) {
        return Result.fail(e.getCode(), e.getMessage());
    }
}
```

Controller 只接收合法参数，校验规则放在 DTO 上，错误格式由异常处理器统一输出。
