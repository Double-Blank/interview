# Java

## 一、Java 基础语法（40 题）

### 1. 基础概念

#### 1. Java 有哪些基本数据类型？

8 种：`byte`、`short`、`int`、`long`、`float`、`double`、`char`、`boolean`。

| 类型 | 大小 | 默认值 | 说明 |
|------|------|--------|------|
| `byte` | 1 字节 | 0 | -128 ~ 127 |
| `short` | 2 字节 | 0 | -32768 ~ 32767 |
| `int` | 4 字节 | 0 | 最常用整数 |
| `long` | 8 字节 | 0L | 字面量加 `L` |
| `float` | 4 字节 | 0.0f | 字面量加 `f` |
| `double` | 8 字节 | 0.0d | 最常用浮点 |
| `char` | 2 字节 | `'\u0000'` | 一个 Unicode 字符 |
| `boolean` | JVM 未规定，通常 1 字节 | false | 只有 true / false |

`String` 不是基本类型，是引用类型。

#### 2. Java 的基本数据类型和引用数据类型有什么区别？

- 基本类型存的是值本身，放在栈（局部变量）或对象里；引用类型存的是对象地址，对象在堆上。
- 基本类型有默认零值，引用类型默认是 `null`。
- 基本类型不能为 `null`，也没有方法；引用类型可以为 `null`，通过包装类或对象调用方法。
- 赋值时基本类型拷贝值，引用类型拷贝的是引用，两个变量可以指向同一个对象。

#### 3. Java 中 `int` 和 `Integer` 有什么区别？

`int` 是基本类型，`Integer` 是它的包装类。

- `int` 不能为 `null`，`Integer` 可以，适合表示“没有值”。
- `Integer` 是对象，能放进泛型集合，也有 `parseInt`、`valueOf` 等方法。
- `Integer` 缓存了 -128 到 127。这个范围内 `Integer.valueOf` 返回同一对象，`==` 可能为 true；超出范围则是不同对象。比较数值应该用 `equals` 或先拆箱。

#### 4. Java 中自动装箱和自动拆箱是什么？

编译器自动做的类型转换。

- 装箱：基本类型变成包装类，例如 `Integer a = 1` 实际是 `Integer.valueOf(1)`。
- 拆箱：包装类变成基本类型，例如 `int b = a` 实际是 `a.intValue()`。

集合里只能放对象，所以 `list.add(1)` 会自动装箱。

#### 5. 自动装箱和拆箱可能带来什么问题？

- 对 `null` 拆箱会抛 `NullPointerException`。
- 用 `==` 比较包装类，缓存范围内相等、范围外不相等，结果不稳定。
- 循环里频繁装箱会创建大量对象，增加 GC 压力。
- 重载时 `int` 和 `Integer` 会匹配不同方法，容易调错。

#### 6. `==` 和 `equals()` 有什么区别？

- `==` 比较基本类型的值；比较对象时比较的是引用，也就是是不是同一个对象。
- `equals()` 是 `Object` 的方法，默认也是比较引用。`String`、包装类、业务实体通常重写它，用来比较内容。
- 比较字符串内容用 `equals`，不要用 `==`。`==` 只有两个引用都指向常量池同一对象时才为 true。

#### 7. 为什么重写 `equals()` 通常需要同时重写 `hashCode()`？

约定是：`equals` 相等的两个对象，`hashCode` 必须相同。

`HashMap`、`HashSet` 先用哈希定位桶，再用 `equals` 比较。如果只重写 `equals`，两个内容相同的对象可能落在不同桶里，集合就去重失败，`contains` 也找不到。反过来，哈希相同只代表可能相等，还要用 `equals` 确认。

#### 8. Java 中 `String` 为什么是不可变对象？

`String` 被声明为 `final`，内部字符数组是 `private` 且没有对外提供修改方法。任何“修改”都会返回新字符串。

好处：

- 可以安全放进常量池，相同字面量复用。
- 哈希值可以缓存，做 Map 的 key 更合适。
- 天然线程安全。
- 类加载、网络、反射等场景把字符串当参数时，不会被中途改掉。

#### 9. `String`、`StringBuilder`、`StringBuffer` 有什么区别？

| | 可变 | 线程安全 | 场景 |
|--|------|----------|------|
| `String` | 不可变 | 是 | 少量拼接、常量 |
| `StringBuilder` | 可变 | 否 | 单线程拼接，优先用 |
| `StringBuffer` | 可变 | 方法加了 `synchronized` | 多线程拼接，现在较少用 |

循环里用 `+` 拼接 `String` 会不断创建新对象。次数多时用 `StringBuilder`。

#### 10. String 常量池是什么？

专门存放字符串字面量和 `intern()` 结果的一块区域。相同字面量只会有一份，所以 `"a" == "a"` 为 true。

JDK 7 起常量池从永久代挪到了堆里。`intern()` 会把堆上的字符串放进池中：池里已有就返回池中引用，没有就把当前引用放进去。

#### 11. `new String("abc")` 会创建几个对象？

要看常量池里有没有 `"abc"`。

- 没有：类加载或执行字面量时在常量池放一个 `"abc"`，`new` 再在堆上创建一个，一共 2 个。
- 已经有：只在堆上新建 1 个，常量池那个被复用。

`new String("abc")` 一定不和常量池里的对象是同一个，所以和 `"abc"` 用 `==` 比较是 false，`equals` 才是 true。

#### 12. Java 中 `final` 关键字有什么作用？

- 修饰变量：基本类型值不能改；引用不能再指向别的对象，但对象内部状态仍可改。
- 修饰方法：不能被重写。
- 修饰类：不能被继承，例如 `String`。
- 成员变量要么声明时赋值，要么在构造器里赋值。

#### 13. `static` 关键字有什么作用？

表示属于类，不属于某个实例。类加载时就初始化。

- 静态变量：所有实例共享。
- 静态方法：通过类名调用，没有 `this`。
- 静态代码块：类加载时执行一次，适合做一次性初始化。
- 静态内部类：不持有外部类实例。

#### 14. `static` 修饰的方法能否访问非静态成员？

不能直接访问。静态方法调用时可能还没有任何实例，也没有 `this`。

可以访问静态变量和其他静态方法。如果手里有一个对象引用，可以通过这个引用去访问它的实例成员。

#### 15. `this` 和 `super` 有什么区别？

- `this` 是当前对象，`super` 是父类部分。
- `this.xxx` 访问本类成员，`super.xxx` 访问父类被隐藏或被重写前的成员。
- `this()` 调用本类其他构造器，`super()` 调用父类构造器。两者都必须是构造器第一行，不能同时出现。
- 子类构造器如果没写，编译器会自动加 `super()`。

#### 16. Java 中值传递和引用传递有什么区别？

- 值传递：把实参的一份拷贝传给方法，方法里改这个拷贝，不影响调用方原来的变量。
- 引用传递：把实参本身传进去，方法里让它指向新对象，调用方也会跟着变。C++ 的引用、传指针的地址都属于这类。

#### 17. Java 为什么说只有值传递？

方法参数永远是拷贝。

- 基本类型拷贝的是值，方法里重新赋值不影响外面。
- 对象拷贝的是引用这个值。方法里改对象的字段，外面能看到，因为两个引用指向同一对象；方法里把参数重新指向别的对象，外面那个引用不变。

所以 Java 没有把“变量本身”传进去，只有值传递。

#### 18. Java 中 `null` 是什么？

`null` 表示引用不指向任何对象。它不是对象，也没有类型方法。

- 对 `null` 调用方法会 `NullPointerException`。
- `null instanceof 任何类型` 都是 false。
- 可以把 `null` 赋给任意引用类型，不能赋给基本类型。
- `HashMap` 允许一个 `null` key，`Hashtable`、`ConcurrentHashMap` 不允许。

#### 19. `instanceof` 关键字有什么作用？

判断对象是不是某个类或其子类、某个接口的实现。结果是 boolean，用于安全的向下转型。

`null instanceof X` 为 false，所以先 `instanceof` 再强转不会因为 null 误转。JDK 16 起可以用模式匹配：`if (obj instanceof String s)`。

#### 20. Java 中的访问修饰符有哪些？

| 修饰符 | 本类 | 同包 | 子类 | 其他包 |
|--------|------|------|------|--------|
| `private` | 是 | 否 | 否 | 否 |
| 默认（不写） | 是 | 是 | 否 | 否 |
| `protected` | 是 | 是 | 是 | 否 |
| `public` | 是 | 是 | 是 | 是 |

外部类只能是 `public` 或包访问。成员可以四种都用。

### 2. 面向对象编程

#### 21. 面向对象编程的三大特性是什么？

封装、继承、多态。有的说法会把抽象算作第四个。

- 封装：隐藏内部数据，只暴露必要接口。
- 继承：子类复用并扩展父类。
- 多态：同一父类型引用，运行时执行不同子类实现。

#### 22. 什么是封装？在实际开发中如何体现？

把数据和操作数据的细节藏起来，外面只能通过公开方法访问。

项目里的体现：字段设为 `private`，用 getter/setter 或业务方法；校验放在方法里而不是让调用方直接改字段；Entity 不直接返回给前端，用 DTO/VO 暴露需要的字段。

#### 23. 什么是继承？Java 为什么不支持多继承？

继承是子类拥有父类的非私有成员，并可以重写方法。关键字是 `extends`，Java 只允许继承一个类。

不支持多类继承，是为了避免菱形问题：两个父类有同名方法时，子类不知道该用哪一个。需要多种能力时，实现多个接口。

#### 24. 什么是多态？多态在实际开发中有什么作用？

编译时看父类引用，运行时执行实际对象的方法。前提是继承或实现、方法重写、父类引用指向子类对象。

作用是面向接口编程。例如 `List list = new ArrayList()`，调用方不依赖具体实现，以后可以换成 `LinkedList`。策略模式、Spring 里对同一接口注入不同实现，都是多态。

#### 25. 方法重载和方法重写有什么区别？

| | 重载 Overload | 重写 Override |
|--|----------------|----------------|
| 位置 | 同一个类 | 子类对父类 |
| 方法名 | 相同 | 相同 |
| 参数 | 必须不同 | 必须相同 |
| 返回值 | 可以不同 | 相同或更具体的子类（协变） |
| 绑定 | 编译期 | 运行期 |
| 权限 | 无关 | 不能比父类更严格 |

重写建议加 `@Override`。

#### 26. 抽象类和接口有什么区别？

| | 抽象类 | 接口 |
|--|--------|------|
| 继承 | 单继承 | 可实现多个 |
| 状态 | 可以有成员变量、构造器 | 只能有常量（传统意义上） |
| 方法 | 抽象方法和普通方法 | 抽象方法；JDK 8 起还有 `default`、`static` |
| 关系 | is-a，适合有共同实现的基类 | can-do，适合能力约定 |

有模板代码、需要持有状态时用抽象类。只定义行为契约时用接口。

#### 27. 抽象类能否创建对象？

不能直接 `new`。可以定义引用，指向子类对象。子类必须实现全部抽象方法，否则子类也得是抽象类。匿名子类在语法上能创建对象，但那已经是子类实例。

#### 28. 接口中能否定义默认方法和静态方法？

可以。JDK 8 起：

- `default` 方法有方法体，实现类可以不重写，用来给老接口加能力且不破坏已有实现。
- `static` 方法属于接口本身，用 `接口名.方法()` 调用。
- JDK 9 还可以有 `private` 方法，给 default 方法复用。

多个接口的 default 方法冲突时，实现类必须重写。

#### 29. 一个类可以实现多个接口吗？

可以。`class A implements B, C`。如果两个接口有相同签名的抽象方法，实现一次即可。如果都有 default 方法且签名相同，类里必须显式重写，指定用哪一个。

#### 30. 构造方法能否被继承、重写或重载？

- 不能继承。子类不会拥有父类构造器，只能在自己的构造器里 `super(...)` 调用。
- 不能重写。构造器不参与多态，子类构造器名字必须和子类相同。
- 可以重载。一个类可以有多个参数列表不同的构造器，用 `this()` 互相调用。

### 3. 面向对象进阶

#### 31. Java 对象的创建过程是什么？

1. 类加载检查：该类是否已加载、链接、初始化。
2. 分配内存：在堆上按对象大小分配，指针碰撞或空闲列表。
3. 零值初始化：字段先设成默认零值。
4. 设置对象头：类型指针、哈希、GC 年龄等。
5. 执行初始化：先父类构造，再本类实例变量和代码块，最后本类构造器。

`new` 之后对象才真正可用。开启逃逸分析时，JIT 可能把没逃逸的对象标量替换，不一定真正在堆上分配。

#### 32. 构造方法和普通方法有什么区别？

- 名字必须和类名相同，没有返回类型，连 `void` 都不写。
- 创建对象时由 JVM 调用，不能随意当普通方法调用（除了 `this()` / `super()`）。
- 不能被继承、重写，也不能声明为 `abstract`、`static`、`final`。
- 一个类可以没有显式构造器，编译器会生成无参构造器；一旦手写了带参构造器，默认无参构造器就不会再生成。

#### 33. 父类和子类的构造方法执行顺序是什么？

类加载时：父类静态变量和静态代码块，然后子类静态变量和静态代码块，只执行一次。

`new` 子类时：

1. 父类实例变量和实例代码块
2. 父类构造器
3. 子类实例变量和实例代码块
4. 子类构造器

所以父类构造器里如果调用了可被重写的方法，可能在子类字段初始化之前就进了子类方法。构造器里不要调用可重写方法。

#### 34. 什么是组合？组合与继承应该如何选择？

组合是一个对象里持有另一个对象，表达 has-a。例如 `Car` 里有 `Engine`，通过调用 `engine.start()` 复用能力。

优先组合：没有严格的 is-a 关系、只想复用部分行为、希望运行时更换依赖时，组合更灵活，也不会把父类的全部接口暴露出去。继承适合真正的特化，并且需要多态。Spring 里 Service 注入 Mapper，就是组合。

#### 35. Java 中的内部类有哪些类型？

- 成员内部类：定义在类里，持有外部类引用。
- 静态内部类：用 `static` 修饰，不持有外部类实例。
- 局部内部类：定义在方法里。
- 匿名内部类：没有类名，通常用来实现接口或继承类，写完就用。

#### 36. 静态内部类和非静态内部类有什么区别？

- 静态内部类不依赖外部实例，`new Outer.Inner()` 即可，只能直接访问外部类的静态成员。
- 成员内部类隐含 `Outer.this`，必须先有外部对象，能访问外部实例的私有成员。
- 成员内部类不能定义静态成员（常量除外），静态内部类可以。
- 成员内部类会拖住外部对象，可能造成内存泄漏。只是逻辑上归在一起、不需要外部实例时，用静态内部类。`HashMap.Node` 就是静态内部类。

#### 37. 匿名内部类是什么？

没有名字的局部类，在创建对象的同时定义类体。常用来实现只有一个方法的接口，例如给按钮绑一个监听器。它能访问外部的 `final` 或事实上不可变的局部变量。Lambda 可以替代其中只含一个抽象方法的写法，但匿名类可以有字段、多个方法，也能继承类。

#### 38. Lambda 表达式是什么？

函数式接口的简洁实现。语法是 `(参数) -> 表达式或代码块`。

```java
list.sort((a, b) -> a.getAge() - b.getAge());
```

它不是内部类的语法糖那么简单，编译后用 `invokedynamic` 调用，运行时才绑定方法。只能用于只有一个抽象方法的接口。

#### 39. 函数式接口是什么？

只有一个抽象方法的接口。可以有多个 `default` 或 `static` 方法。用 `@FunctionalInterface` 标注后，编译器会检查是不是真的只有一个抽象方法。

常见的有 `Runnable`、`Callable`、`Comparator`、`Function`、`Consumer`、`Supplier`、`Predicate`。Lambda 和方法引用都要求目标类型是函数式接口。

#### 40. `Object` 类有哪些常用方法？

- `equals` / `hashCode`：相等和哈希。
- `toString`：字符串表示，默认是 `类名@哈希`。
- `getClass`：运行时类对象。
- `clone`：浅拷贝，类要实现 `Cloneable`。
- `wait` / `notify` / `notifyAll`：线程等待和唤醒，必须在同步块里用。
- `finalize`：GC 前的回调，已废弃，不要用。

## 二、Java 集合框架（30 题）

### 1. 集合基础

#### 1. Java 集合框架主要包含哪些接口？

两大根：

- `Collection`：单列数据。下面有 `List`、`Set`、`Queue`。
- `Map`：键值对。`Map` 不继承 `Collection`。

`Collection` 继承 `Iterable`，所以可以用 for-each。常见实现：`ArrayList`、`LinkedList`、`HashSet`、`TreeSet`、`ArrayDeque`、`HashMap`、`TreeMap`、`LinkedHashMap`。

#### 2. `Collection` 和 `Map` 有什么区别？

`Collection` 存一个个元素，有 `add`、`remove`、`iterator`。`Map` 存 key 到 value，用 `put`、`get`，key 不重复。两者没有继承关系，但 `Map` 可以通过 `keySet`、`values`、`entrySet` 得到 `Collection` 视图。

#### 3. `List`、`Set`、`Map` 有什么区别？

- `List`：有序，可重复，按下标访问。
- `Set`：不重复，没有下标。`HashSet` 无序，`LinkedHashSet` 保持插入顺序，`TreeSet` 排序。
- `Map`：key 不重复，value 可以重复。一个 key 对应一个 value。

#### 4. `ArrayList` 和 `LinkedList` 有什么区别？

- `ArrayList` 底层是动态数组，按下标访问 O(1)，中间插入删除要搬移元素 O(n)，内存连续，遍历快。
- `LinkedList` 是双向链表，还实现了 `Deque`。已知节点时插入删除 O(1)，但按下标访问要遍历 O(n)。每个节点还有前后指针，更占内存。

实际开发几乎都用 `ArrayList`。只有频繁在头尾插入、当作队列或双端队列时才考虑 `LinkedList`，很多场景 `ArrayDeque` 更合适。

#### 5. `ArrayList` 底层使用什么数据结构？

`Object[] elementData`。逻辑长度是 `size`，数组长度是容量 `capacity`。`size` 到容量上限后才会扩容。

#### 6. `ArrayList` 默认容量是多少？

默认容量是 10。JDK 8 起，无参构造不会立刻分配长度为 10 的数组，而是先用一个空数组，第一次 `add` 时才扩到 10。如果构造时传入初始容量，就按这个容量分配。

#### 7. `ArrayList` 扩容机制是什么？

容量不够时调用 `grow`。新容量大约是旧容量的 1.5 倍（`old + (old >> 1)`）。然后 `Arrays.copyOf` 把元素拷到新数组。如果一次 `addAll` 需要的空间比 1.5 倍还大，就直接扩到需要的大小。扩容有数组拷贝成本，知道大概数量时最好在构造时指定容量。

#### 8. `ArrayList` 删除元素时需要注意什么？

- for-each 或普通 for 里直接 `list.remove` 会触发 fail-fast，抛 `ConcurrentModificationException`。要用迭代器的 `remove`，或 `removeIf`。
- 按下标删除时，后面的元素会前移，如果正向遍历又 `i++`，会跳过元素。可以倒序删。
- `remove(int)` 是按下标，`remove(Object)` 是按值。列表里是 `Integer` 时，`remove(1)` 删的是下标 1，不是值为 1 的元素。

#### 9. `LinkedList` 底层使用什么数据结构？

双向链表。节点有 `item`、`prev`、`next`，链表还有 `first`、`last` 和 `size`。它同时实现 `List` 和 `Deque`，适合头尾操作。按下标访问时，会先判断靠头还是靠尾，再从较近的一端走。

#### 10. `ArrayList` 和 `LinkedList` 分别适合什么场景？

- `ArrayList`：随机访问、遍历、尾部追加，也就是绝大多数业务列表。
- `LinkedList`：需要频繁在头部插入删除，或者当作队列、栈。中间插入并不占优，因为先要 O(n) 找到位置。

### 2. Map 集合

#### 11. `HashMap` 底层数据结构是什么？

JDK 8 是数组 + 链表 + 红黑树。`Node<K,V>[] table`，每个位置是一个桶。key 经过扰动哈希，再用 `(n - 1) & hash` 定位下标。桶上先挂链表，冲突太多再转成红黑树。

#### 12. `HashMap` 的哈希冲突如何解决？

拉链法。同一个下标上的多个节点串成链表。JDK 8 在链表过长时树化，把查找从 O(n) 降到 O(log n)。哈希本身还会把高位参与运算，减少低位冲突。数组长度始终是 2 的幂，用位运算代替取模。

#### 13. `HashMap` 为什么使用红黑树？

链表太长时，`get` / `put` 退化成线性查找。恶意构造相同哈希还可以打成拒绝服务。红黑树近似平衡，查找、插入、删除都是 O(log n)，同时比 AVL 旋转更少，适合增删混合的场景。

#### 14. `HashMap` 链表转红黑树的条件是什么？

同时满足：

- 该桶链表长度达到 8（`TREEIFY_THRESHOLD`）。
- 数组长度达到 64（`MIN_TREEIFY_CAPACITY`）。

长度到 8 但数组还不到 64 时，优先扩容而不是树化，因为扩容后节点会重新分散。树节点减少到 6 时退回链表，避免来回转换。

#### 15. `HashMap` 的默认容量是多少？

16，也就是 `1 << 4`。容量必须是 2 的幂。传入的初始容量会被向上取成 2 的幂。例如传 10，实际容量是 16。

#### 16. `HashMap` 的负载因子是什么？

默认 0.75。阈值 `threshold = capacity * loadFactor`。元素个数超过阈值就扩容。

0.75 是空间和冲突的折中。太小会频繁扩容、浪费数组；太大链表变长，查询变慢。一般不用改。

#### 17. `HashMap` 扩容机制是什么？

超过阈值后容量翻倍，例如 16 变 32，然后把旧节点搬到新数组。JDK 8 不需要重新算完整哈希：看哈希值新增的那一位是 0 还是 1，决定留在原下标，还是挪到“原下标 + 旧容量”。扩容时链表和树都会拆分。

#### 18. `HashMap` 为什么不是线程安全的？

`put`、扩容都没有同步。两个线程可能同时往同一个桶插入，互相覆盖；也可能都读到旧的 `size`，导致计数丢失。JDK 7 扩容时头插法在并发下还可能形成环形链表，`get` 死循环。JDK 8 改成尾插，不再成环，但数据覆盖和丢失仍然存在。多线程用 `ConcurrentHashMap`。

#### 19. `HashMap` 和 `Hashtable` 有什么区别？

| | HashMap | Hashtable |
|--|---------|-----------|
| 线程安全 | 否 | 方法级 `synchronized`，锁整张表 |
| null | 允许 1 个 null key、多个 null value | key 和 value 都不能为 null |
| 初始容量 | 16，2 的幂 | 11 |
| 迭代器 | fail-fast | 也是 fail-fast，但更老 |
| 现状 | 常用 | 遗留类，不建议用 |

#### 20. `HashMap` 和 `ConcurrentHashMap` 有什么区别？

`ConcurrentHashMap` 线程安全，并且锁粒度细。JDK 8 里空桶用 CAS 放入第一个节点，桶上已有节点时只 `synchronized` 这个桶头，不同桶可以并发写。读基本不加锁，靠 `volatile` 和节点不变性保证可见性。

它不允许 null key 和 null value，避免“值为 null”和“key 不存在”分不清。迭代器是弱一致的，遍历时不会抛 `ConcurrentModificationException`，也不保证能看到之后的全部修改。

### 3. Set 与其他集合

#### 21. `HashSet` 底层如何实现去重？

内部是一个 `HashMap`，元素当 key，value 是一个固定的哑对象。`add` 就是 `map.put(e, PRESENT) == null`。key 是否重复由 `hashCode` 和 `equals` 决定。所以放进 `HashSet` 的对象必须正确实现这两个方法。

#### 22. `HashSet` 和 `TreeSet` 有什么区别？

- `HashSet` 基于哈希，无序，增删查平均 O(1)，允许一个 null。
- `TreeSet` 基于红黑树，元素按自然顺序或 `Comparator` 排序，操作 O(log n)，一般不允许 null，元素必须能比较。

需要去重且不关心顺序用 `HashSet`。需要有序、范围查询用 `TreeSet`。

#### 23. `LinkedHashMap` 有什么特点？

在 `HashMap` 上额外维护一条双向链表，默认记录插入顺序，遍历时按插入顺序而不是哈希桶顺序。构造时把 `accessOrder` 设为 true，则按访问顺序排列。再重写 `removeEldestEntry`，可以做成 LRU 缓存。

#### 24. `TreeMap` 底层使用什么数据结构？

红黑树。key 有序，`get` / `put` / `remove` 都是 O(log n)。可以拿 `firstKey`、`lastKey`、`subMap`、`ceilingKey` 做范围查询。key 必须实现 `Comparable`，或者创建时传入 `Comparator`。

#### 25. `Comparable` 和 `Comparator` 有什么区别？

- `Comparable` 写在类里面，`compareTo` 定义自然顺序，一个类通常只有一种。
- `Comparator` 是外部比较器，`compare(a, b)`，同一个类可以有多套排序，例如按年龄、按姓名。不修改原类就能排序。

`Comparator` 更灵活。两者都要和 `equals` 保持一致，否则 `TreeSet` 会认为两个 equals 的对象是不同元素，或者反过来丢掉不相等的元素。

#### 26. 什么是迭代器？

统一遍历集合的接口。核心方法是 `hasNext`、`next`，可选 `remove`。集合实现 `Iterable` 后，for-each 就会向它要迭代器。调用方不用关心底层是数组还是链表。

#### 27. `Iterator` 和 `ListIterator` 有什么区别？

`Iterator` 只能往后走，`remove` 删除刚返回的元素。`ListIterator` 只给 `List` 用，可以 `previous` 往前走，还能 `add`、`set`，并拿到下一个或上一个下标。

#### 28. 什么是快速失败机制（Fail-Fast）？

`ArrayList`、`HashMap` 的迭代器会记录 `expectedModCount`。遍历过程中如果集合结构被修改（不是通过迭代器自己的 `remove`），`modCount` 对不上，立刻抛 `ConcurrentModificationException`。

这是为了尽早暴露并发修改，不是绝对保证。多线程下它不能替代同步。`CopyOnWriteArrayList`、`ConcurrentHashMap` 是弱一致，属于 fail-safe，遍历不会因为修改而抛这个异常。

#### 29. 为什么遍历集合时直接删除元素可能出现异常？

for-each 底层就是迭代器。循环体里调用 `list.remove` 会改 `modCount`，但迭代器记的 `expectedModCount` 没更新，下次 `next` 就抛 `ConcurrentModificationException`。

正确做法：`iterator.remove()`、`removeIf`，或者按下标倒序删除。

#### 30. `Arrays.asList()` 返回的集合有什么限制？

返回的是 `Arrays` 的内部类，底层还是原来的数组，长度固定。

- 不能 `add`、`remove`，会抛 `UnsupportedOperationException`。
- 可以 `set` 修改元素，改动会反映到原数组。
- 传入基本类型数组时，整个数组会变成列表里的一个元素，而不是把每个数字拆开。`Arrays.asList(1, 2, 3)` 才是三个元素。
- 它不是 `java.util.ArrayList`。需要可变列表时用 `new ArrayList<>(Arrays.asList(...))`。

## 三、泛型与异常处理（20 题）

### 1. 泛型

#### 1. Java 泛型是什么？解决了什么问题？

泛型把类型变成参数，让类、接口、方法在编译期就约定元素类型。例如 `List<String>` 只能放字符串。

它解决的是早期集合只能放 `Object`、取出后要强制转型、转错了要到运行时才抛 `ClassCastException` 的问题。类型检查提前到编译期，也省掉了大量强转。

#### 2. Java 为什么需要泛型？

没有泛型时，一个 `List` 什么都能塞，取出来都是 `Object`。代码可读性差，也容易把 `Integer` 当成 `String`。泛型让 API 自己表达类型约束，调用方写错类型过不了编译。集合、`Optional`、Spring 的很多返回值都依赖它。

#### 3. 泛型类、泛型接口和泛型方法有什么区别？

- 泛型类：`class Box<T>`，创建对象时指定 `T`。
- 泛型接口：`interface List<E>`，实现类可以继续带这个类型参数，也可以指定成具体类型。
- 泛型方法：`<T> T first(List<T> list)`，类型在调用时推断。普通类里也可以有泛型方法。

静态方法不能使用类上的类型参数，因为调用静态方法时还没有这个类的具体 `T`。静态方法要类型参数，就写成泛型方法。

#### 4. 泛型中的类型参数 `T`、`E`、`K`、`V` 分别代表什么？

只是命名习惯，编译器不区分：

- `T`：Type，任意类型。
- `E`：Element，集合元素。
- `K` / `V`：Key / Value。
- `N`：Number。
- `?`：未知类型，不是声明类型参数，是通配符。

#### 5. 什么是泛型类型擦除？

编译之后，泛型信息会被擦掉。`List<String>` 和 `List<Integer>` 在字节码里都是原始类型 `List`，元素变成上限类型，没有上限就是 `Object`。所以运行时拿不到 `new ArrayList<String>()` 里的 `String`，也不能 `new T()` 或 `new T[]`。

编译器会在需要的地方插入强转，并通过桥方法保持重写关系。

#### 6. Java 泛型为什么采用类型擦除？

为了兼容 JDK 5 之前的老代码。泛型是编译期功能，JVM 不需要改指令集，旧的原始类型库和新的泛型代码能互相调用。代价是运行时不能区分 `List<String>` 和 `List<Integer>`，也不能直接创建类型参数的实例。

#### 7. `List<String>` 和 `List<Object>` 有继承关系吗？

没有。泛型是不变的。虽然 `String` 是 `Object` 的子类，`List<String>` 不是 `List<Object>` 的子类。

如果允许赋值，就可以通过 `List<Object>` 往里面 `add(new Date())`，把 `List<String>` 弄脏。需要“某种列表”时用通配符 `List<?>`。

#### 8. 什么是泛型通配符 `?`？

`?` 表示未知的具体类型。`List<?>` 是某种类型的列表，但调用方不知道是哪一种。

可以读取成 `Object`，不能往里添加元素（除了 `null`），因为编译器无法确认加入的值是否匹配那个未知类型。适合只遍历、不写入的参数。

#### 9. `<? extends T>` 和 `<? super T>` 有什么区别？

- `? extends T`：上界。列表里是 T 或 T 的子类。可以安全地当成 T 读出来，不能写入（除了 null），因为实际可能是子类。
- `? super T`：下界。列表里是 T 或 T 的父类。可以写入 T，读出来只能当成 `Object`，因为实际类型可能是某个父类。

#### 10. 什么是 PECS 原则？

Producer Extends，Consumer Super。

- 方法只从集合里拿数据，集合是生产者，用 `? extends T`。
- 方法只往集合里放数据，集合是消费者，用 `? super T`。
- 又读又写，就用确切类型，不要通配符。

`Collections.copy(dest, src)` 就是 dest 用 `? super T`，src 用 `? extends T`。

### 2. 异常处理

#### 11. Java 异常体系结构是什么？

`Throwable` 是根。下面分两支：

- `Error`：JVM 级严重问题，如 `OutOfMemoryError`、`StackOverflowError`。一般不捕获。
- `Exception`：程序可以处理的异常。
  - 受检异常：`IOException`、`SQLException` 等，编译器强制处理。
  - 非受检异常：`RuntimeException` 及其子类，如 `NullPointerException`、`IllegalArgumentException`。

#### 12. `Exception` 和 `Error` 有什么区别？

`Exception` 是业务或调用方式上的问题，可以捕获后恢复，或者转换成统一错误响应。`Error` 表示 JVM 已经很难继续正常运行，例如内存耗尽、栈溢出。捕获 `Error` 通常没有意义，应该从资源、代码和配置上排查。

#### 13. 受检异常和非受检异常有什么区别？

受检异常继承 `Exception` 但不继承 `RuntimeException`。方法要么 `try-catch`，要么在签名上 `throws`，否则编译失败。用来提醒调用方处理可预期的外部失败。

非受检异常继承 `RuntimeException`，编译器不强制处理。空指针、参数非法、业务校验失败通常用这一支。业务项目里自定义异常大多继承 `RuntimeException`，避免每一层都写 `throws`。

#### 14. `throw` 和 `throws` 有什么区别？

- `throw` 写在方法体内，立刻抛出一个异常对象：`throw new IllegalArgumentException("id 不能为空")`。
- `throws` 写在方法签名上，声明这个方法可能抛出哪些受检异常，交给调用方处理。

一个是动作，一个是声明。

#### 15. `try-catch-finally` 的执行顺序是什么？

先执行 `try`。没有异常就跳过 `catch`，然后执行 `finally`。有异常则匹配第一个类型合适的 `catch`，再执行 `finally`。

`return` 在 `finally` 之前会先把返回值准备好，但 `finally` 仍会执行。`finally` 里再写 `return` 会覆盖原来的返回值，也会吞掉原来的异常，不要这么写。

#### 16. `finally` 一定会执行吗？

正常的 `return`、`break`、异常都会走 `finally`。下面几种不会：

- `System.exit` 直接退出 JVM。
- JVM 崩溃、进程被 `kill -9`、断电。
- `try` 或 `catch` 里死循环，根本走不到 `finally`。
- 调用 `finally` 的那个线程被中断停掉。

所以说“几乎总会执行”，不能说在任何情况下都执行。

#### 17. `try-with-resources` 是什么？

JDK 7 的资源管理语法。在 `try ()` 里声明实现了 `AutoCloseable` 的资源，离开 `try` 时自动 `close`，包括发生异常的情况。多个资源按声明的反序关闭。

```java
try (InputStream in = new FileInputStream("a.txt")) {
    // 使用 in
}
```

如果业务代码和 `close` 都抛异常，业务异常是主异常，关闭异常挂在 `getSuppressed()` 上，不会把原始异常盖掉。JDBC 连接、流、锁都适合这样写。

#### 18. 如何自定义业务异常？

继承 `RuntimeException`，带上业务错误码和提示信息。不要把 SQL、堆栈细节放进返回给前端的 message。

```java
public class BusinessException extends RuntimeException {
    private final int code;
    public BusinessException(int code, String message) {
        super(message);
        this.code = code;
    }
}
```

使用时 `throw new BusinessException(40401, "用户不存在")`。全局异常处理里识别它，返回对应的 HTTP 状态和错误码。

#### 19. 为什么不建议直接捕获 `Exception`？

`catch (Exception e)` 会把bug、参数错误、业务异常、受检异常全部吃掉。调用方以为处理过了，实际根因被藏起来，只剩一句空日志。

应该捕获能够处理的具体异常。暂时处理不了就往上抛。只有在系统边界，例如 Controller 的统一异常处理，才捕获宽类型，并且要区分业务异常和未知系统异常，系统异常必须打完整堆栈。

#### 20. Java 后端项目中应该如何设计统一异常处理机制？

Controller 不写大段 try-catch。用 `@RestControllerAdvice` 加 `@ExceptionHandler` 集中处理。

- 参数校验失败：返回 400 和字段错误。
- 自定义 `BusinessException`：返回约定的业务码和提示，一般不打 ERROR 堆栈。
- 未捕获异常：返回 500 和通用文案，服务端记录 requestId 和完整堆栈。
- 响应体统一成 `{ code, message, data }`，不要有的接口返回对象、有的接口返回字符串。

异常只表达失败，不要用异常做正常分支控制。

## 四、Stream API 与 Lambda（15 题）

#### 1. Java Stream API 是什么？

JDK 8 引入的声明式数据处理方式。把集合看成元素序列，用 `filter`、`map`、`sorted`、`collect` 串成流水线，描述“要什么结果”，而不是手写 for 循环怎么遍历。Stream 在 `java.util.stream` 包里，不存数据。

#### 2. Stream 和 Collection 有什么区别？

`Collection` 是数据结构，负责存元素，可以反复遍历。`Stream` 是计算流程，不保存元素，一次终端操作之后就消费完，不能重复用。Stream 可以来自集合、数组、文件或生成器，也可以是无限流。

#### 3. Stream 的中间操作和终端操作有什么区别？

- 中间操作返回新的 Stream，例如 `filter`、`map`、`flatMap`、`sorted`、`distinct`、`peek`、`limit`。它们是惰性的，调用时不真正遍历。
- 终端操作触发计算并得到结果或副作用，例如 `collect`、`forEach`、`reduce`、`count`、`findFirst`、`anyMatch`。一个 Stream 只能有一个终端操作。

#### 4. Stream 为什么采用惰性执行？

中间操作只是记录步骤。没有终端操作，整个链路不会执行，`peek` 里的打印也不会出现。

这样可以把多个操作合成一次遍历，也能短路：`limit`、`findFirst`、`anyMatch` 找到结果就可以停，不必处理后面的元素。

#### 5. `map()` 和 `flatMap()` 有什么区别？

`map` 是一对一，一个元素变成一个新元素。`map(User::getName)` 得到 `Stream<String>`。

`flatMap` 是一对多再铺平。如果 `map` 之后得到 `Stream<Stream<T>>` 或 `Stream<List<T>>`，用 `flatMap` 把内层合成一个 `Stream<T>`。例如每个订单有多个商品，要把所有订单的商品收成一个商品流。

#### 6. `filter()` 有什么作用？

按条件保留元素。参数是 `Predicate`，返回 true 的留下。

```java
users.stream().filter(u -> u.getAge() >= 18)
```

它不修改原集合，只在流水线里跳过不满足的元素。

#### 7. `reduce()` 有什么作用？

把流归约成一个值。可以传初始值，也可以不传。不传时返回 `Optional`，空流就是 empty。

求和就是 `reduce(0, Integer::sum)`。`map` 加 `reduce` 是 map-reduce 模型。需要放进集合时，优先用 `collect`，它是可变归约，比反复创建新对象更合适。

#### 8. `collect()` 有什么作用？

终端操作，用 `Collector` 把元素累积到一个可变容器里。最常见的是收成 `List`、`Set`、`Map`，也可以分组、分区、拼接字符串、统计数量。`Collectors` 里提供了这些现成收集器。

#### 9. `Collectors.toList()` 如何使用？

```java
List<String> names = users.stream()
    .map(User::getName)
    .collect(Collectors.toList());
```

JDK 8 的 `toList()` 返回可变的 `ArrayList`。JDK 16 起 Stream 自己有 `toList()`，返回的是不可变列表。需要之后继续 `add` 时，仍用 `Collectors.toList()` 或 `toCollection(ArrayList::new)`。

#### 10. `Collectors.groupingBy()` 如何实现分组？

按分类函数把元素放进 `Map<K, List<T>>`。

```java
Map<String, List<User>> byCity =
    users.stream().collect(Collectors.groupingBy(User::getCity));
```

第二个参数可以换成下游收集器，例如 `groupingBy(User::getCity, Collectors.counting())` 得到每个城市的人数，`groupingBy(..., Collectors.mapping(...))` 只收集某个字段。

#### 11. `Collectors.partitioningBy()` 和 `groupingBy()` 有什么区别？

`partitioningBy` 只接受 boolean 条件，结果一定是两份：`true` 一组、`false` 一组，空的那组也会出现。`groupingBy` 的 key 可以是任意类型，有多少种 key 就有多少组，没有元素的 key 不会出现。

年龄是否成年用 `partitioningBy`。按城市、按状态分组用 `groupingBy`。

#### 12. `sorted()` 如何实现自定义排序？

无参 `sorted()` 要求元素实现 `Comparable`。自定义顺序传入 `Comparator`：

```java
users.stream()
    .sorted(Comparator.comparing(User::getAge).thenComparing(User::getName))
```

`reversed()` 可以倒序。`sorted` 是有状态的中间操作，要看完所有元素才能输出。

#### 13. `distinct()` 如何实现去重？

依赖 `equals` 和 `hashCode`。这两个方法没重写，对象就按引用去重，内容相同也会留下多份。它是有状态操作，并行流下要额外保证顺序，成本比串行更高。

#### 14. `parallelStream()` 是什么？适合什么场景？

把流拆到 `ForkJoinPool.commonPool` 里并行算，最后合并。适合数据量大、每个元素的计算是 CPU 密集、操作无状态且可结合（例如求和、无共享变量的 map）。

不适合：数据量很小（拆分和调度比计算还贵）、里面做 IO 或抢同一把锁、依赖遇到顺序、用了会被并发修改的共享集合。公共线程池被占满还会拖慢别的并行任务。默认先用普通 `stream()`。

#### 15. Stream 中间操作是否会修改原始集合？

不会改集合结构。`filter`、`map`、`sorted` 产生的是新流，原 `List` 的内容和顺序都还在。

如果在 `forEach` 里修改元素对象的字段，对象本身会变，因为流里拿的是同一个引用。不要在流处理过程中对源流 `add` / `remove`，可能抛 `ConcurrentModificationException`。

## 五、JVM（20 题）

### 1. JVM 内存结构

#### 1. JVM 是什么？

Java Virtual Machine，执行 Java 字节码的虚拟机。`.java` 先编译成 `.class`，JVM 再解释或即时编译成当前 CPU 的机器码。所以同一份字节码可以在不同操作系统上跑。HotSpot 是最常用的实现。

#### 2. JDK、JRE、JVM 有什么区别？

- JVM：运行字节码，负责内存、GC、即时编译。
- JRE：JVM 加上运行所需的标准库，只能跑不能编译。
- JDK：JRE 加上 `javac`、`jar`、`jstack`、`jmap` 等开发诊断工具。

写代码装 JDK。JDK 11 之后 Oracle 不再单独提供 JRE 发行包，运行环境通常也直接用 JDK，或者用 `jlink` 裁剪运行时。

#### 3. JVM 运行时数据区包含哪些部分？

线程私有：

- 程序计数器
- 虚拟机栈
- 本地方法栈

线程共享：

- 堆
- 方法区（JDK 8 起类元数据在元空间）

直接内存不属于 JVM 运行时数据区，但 NIO 的 `DirectByteBuffer` 会用到，也会 OOM。

#### 4. 堆和栈有什么区别？

| | 栈 | 堆 |
|--|----|----|
| 存放 | 栈帧：局部变量、操作数栈、方法出口 | 对象实例、数组 |
| 共享 | 每个线程一份 | 所有线程共享 |
| 分配 | 入栈出栈，速度快 | 相对慢，由 GC 回收 |
| 异常 | 栈太深 `StackOverflowError` | 对象太多 `OutOfMemoryError` |
| 空间 | 通常 1MB 量级，`-Xss` | 主要内存，`-Xms` `-Xmx` |

基本类型局部变量在栈帧里。对象在堆上，栈上只留引用。

#### 5. Java 对象一般存储在哪里？

普通对象和数组在堆上。局部变量表里的引用、返回地址在虚拟机栈。类的元数据在元空间。静态变量随 Class 对象放在堆里。

如果对象没有逃出方法，JIT 可能做逃逸分析和标量替换，把字段拆成局部变量，看起来像分配在栈上。这是优化，不是语言保证。

#### 6. 方法区是什么？

JVM 规范里的一块逻辑区域，存已被加载的类信息、运行时常量池、静态变量等。它是线程共享的。

JDK 7 及以前 HotSpot 用永久代实现方法区，放在堆的连续内存里。JDK 8 取消永久代，类元数据改到本地内存的元空间，字符串常量池和静态变量在堆中。

#### 7. 什么是元空间（Metaspace）？

JDK 8 用元空间替代永久代，存放类的元数据，使用本地内存，默认只受机器内存限制。可以用 `-XX:MaxMetaspaceSize` 设上限。

类加载过多、动态代理或脚本不断生成新类、类加载器泄漏，会 `OutOfMemoryError: Metaspace`。它和堆 OOM 不是同一个问题，加堆内存解决不了。

#### 8. 程序计数器有什么作用？

每个线程一个，记录当前线程执行到哪一条字节码。线程切换回来后，从这里继续。执行 native 方法时，计数器为空。它是唯一不会发生 OOM 的运行时数据区，占用极小。

#### 9. 本地方法栈是什么？

给 native 方法使用的栈。Java 方法走虚拟机栈，JNI 方法走本地方法栈。HotSpot 把两者合在一起实现。栈深度超出限制同样会 `StackOverflowError`，申请不到内存会 OOM。

#### 10. 什么情况下会发生 `StackOverflowError`？

线程栈帧太多或单个栈帧太大。最常见是递归没有终止条件，或者递归深度超过 `-Xss` 能容纳的层数。方法局部变量特别多、链路非常深的调用也会。把栈调大只能延后问题，无限递归还是会爆。应该先看递归终止条件和是否可以改成循环。

### 2. 垃圾回收机制

#### 11. 什么是垃圾回收机制（GC）？

JVM 自动找出不再使用的对象并回收内存。开发者一般不用手动释放对象。GC 主要在堆上工作，也会卸载不再使用的类。回收时通常要暂停应用线程一小段时间，也就是 Stop-The-World。不同收集器的目标是在吞吐和停顿之间取舍。

#### 12. JVM 如何判断对象是否可以被回收？

主流是可达性分析，不是引用计数。从 GC Roots 出发顺着引用遍历，遍历不到的对象就是不可达，可以回收。

引用计数实现简单，但解决不了循环引用：两个对象互相引用、外面已经没人用，计数仍不为 0。HotSpot 不用它做主判断。

对象还有 `finalize` 一次自救机会，但这个机制已废弃，不能依赖。

#### 13. 什么是可达性分析算法？

把对象引用关系看成图。GC Roots 是起点，从起点能走到的对象都是存活的，其余标记为垃圾。标记阶段会沿着普通引用、软引用、弱引用等规则处理。不可达对象在清理阶段被回收。循环引用只要整体从 Roots 走不到，就会被一起回收。

#### 14. 什么是 GC Roots？

一组必定存活的引用起点，常见有：

- 虚拟机栈里正在使用的局部变量
- 方法区里的静态变量
- 常量引用
- 本地方法栈中的 JNI 引用
- 正在运行的线程对象
- 同步锁持有的对象

从这些点出发还要再沿着成员引用往下走。

#### 15. 常见的垃圾回收算法有哪些？

- 标记-清除：标出垃圾再清掉。会产生内存碎片。
- 标记-复制：把存活对象拷到另一块空间，原空间整块清空。没有碎片，浪费一半空间，适合存活少的新生代。
- 标记-整理：把存活对象挪到一端，再清掉边界外的内存。没有碎片，移动对象成本高，适合老年代。

实际收集器都是分代组合这些算法，而不是全堆只用一种。

#### 16. 什么是新生代和老年代？

分代假说：大多数对象朝生夕灭，活下来的往往活很久。

- 新生代：Eden 和两个 Survivor。新对象进 Eden，Minor GC 后存活对象在两个 Survivor 之间复制，年龄增加。
- 老年代：年龄达到阈值（默认 15），或者 Survivor 放不下，对象晋升到这里。空间更大，回收更少但更慢。

大对象可能直接进老年代，避免在新生代来回复制。

#### 17. 什么是 Minor GC、Major GC 和 Full GC？

- Minor GC / Young GC：只回收新生代，频繁，停顿通常短。
- Major GC：通常指回收老年代。各资料对这个词不完全统一。
- Full GC：回收整个堆，经常还包含元空间。停顿最长。`System.gc()` 只会建议做一次，不保证立刻执行。

老年代空间不足、元空间不足、晋升失败，都可能触发 Full GC。接口突然变慢，要看是不是 Full GC 停顿。

#### 18. 常见的垃圾回收器有哪些？

- Serial：单线程，适合小型应用或客户端。
- Parallel / Throughput：多线程，追求吞吐量，JDK 8 默认。
- CMS：并发标记清除，降低停顿，已在较新 JDK 中移除。有碎片和 Concurrent Mode Failure。
- G1：JDK 9 起服务端默认，按 Region 收集，可设停顿目标。
- ZGC、Shenandoah：超低停顿，适合超大堆。

#### 19. G1 垃圾回收器有什么特点？

把堆切成很多大小相同的 Region，每个 Region 可以是 Eden、Survivor、Old 或大对象区。它跟踪每个 Region 的垃圾比例，优先回收回收价值高的 Region，所以叫 Garbage First。

G1 有年轻代收集，也有并发标记和混合收集。可以用 `-XX:MaxGCPauseMillis` 提停顿目标，G1 会自己调整年轻代大小。对象在 Region 之间复制，整体没有 CMS 那种整堆碎片问题。JDK 9 到 JDK 20 左右，它是大多数服务端应用的默认选择；超大堆、极低停顿会改用 ZGC。

#### 20. Java 中出现内存溢出（OOM）应该如何排查？

先看错误类型，不同区域处理方式不同。

- `Java heap space`：堆不够或有泄漏。
- `Metaspace`：类太多或类加载器泄漏。
- `Direct buffer memory`：堆外直接内存。
- `unable to create new native thread`：线程太多或系统限制。
- `GC overhead limit exceeded`：GC 占用极高但几乎收不回内存。

排查步骤：启动参数加上 HeapDumpOnOutOfMemoryError，保留 dump 和 GC 日志。用 MAT、VisualVM 或 JProfiler 看占用最大的对象、谁引用着它们。再用 `jstat` 看 GC 频率。区分“流量真的需要更大堆”和“对象该释放却被静态集合、缓存、ThreadLocal、未关闭的资源拽住”。

## 六、Java 多线程与并发（25 题）

### 1. 线程基础

#### 1. 进程和线程有什么区别？

进程是操作系统分配资源的单位，有独立的地址空间。一个进程挂了，一般不影响其他进程。线程是 CPU 调度的单位，同一个进程里的线程共享堆和方法区，各自有栈和程序计数器。

线程创建和切换更轻，通信可以直接读写共享变量，所以也要处理线程安全。Java 里一个 JVM 进程可以有很多线程。

#### 2. Java 中创建线程有哪些方式？

常见有四种说法，真正启动线程都要经过 `Thread`。

- 继承 `Thread`，重写 `run`。Java 单继承，不推荐。
- 实现 `Runnable`，交给 `Thread` 或线程池。
- 实现 `Callable`，配合 `FutureTask`，可以拿到返回值和异常。
- 线程池 `ExecutorService` 提交任务。生产环境用这种方式，而不是随时 `new Thread`。

JDK 21 还有虚拟线程，适合大量阻塞型任务。

#### 3. `Runnable` 和 `Callable` 有什么区别？

`Runnable.run()` 没有返回值，也不能抛受检异常。`Callable.call()` 返回一个结果，可以抛异常。`Callable` 要通过 `FutureTask` 或线程池的 `submit` 提交，之后用 `Future.get()` 取结果。`get` 会阻塞，任务里的异常会包成 `ExecutionException` 抛出来。

#### 4. `start()` 和 `run()` 有什么区别？

`start()` 让线程进入就绪，由 CPU 稍后调度，在新线程里执行 `run`。一个线程对象的 `start` 只能调用一次。

直接调用 `run()` 就是普通方法调用，在当前线程执行，不会新建线程。

#### 5. Java 线程有哪些生命周期状态？

`Thread.State` 有六种：

- `NEW`：创建了还没 `start`。
- `RUNNABLE`：可运行，包含正在跑和等 CPU 的就绪态。
- `BLOCKED`：等 `synchronized` 锁。
- `WAITING`：无限期等待，如 `wait()`、`join()`。
- `TIMED_WAITING`：带超时的等待，如 `sleep`、`wait(timeout)`。
- `TERMINATED`：运行结束。

`sleep` 不释放锁，时间到了回到 `RUNNABLE`。`wait` 会释放锁，需要 `notify` 或超时。

#### 6. 什么是线程上下文切换？

CPU 同一时刻在一个核上只跑一个线程。切换时要把当前线程的程序计数器、寄存器等保存起来，再恢复另一个线程的。这个保存和恢复就是上下文切换。

切换本身不干活，线程太多、锁竞争严重、频繁阻塞时，切换成本会明显吃掉性能。线程池就是为了控制线程数量。

#### 7. 什么是线程安全？

多个线程同时访问共享数据时，程序仍然表现正确，不会出现丢更新、脏读、对象结构被改坏。要做到这一点，需要处理三件事：原子性、可见性、有序性。

无状态方法、局部变量、不可变对象天然线程安全。有共享可变状态时，用 `synchronized`、`Lock`、并发容器或原子类保护。

#### 8. 什么是死锁？如何避免死锁？

两个或多个线程各自拿着对方需要的锁，并且都不释放，所有人都永远等下去。

四个条件同时满足才会死锁：互斥、占有且等待、不可抢占、循环等待。

避免办法：所有线程按相同顺序加锁；用 `tryLock` 超时；缩小锁范围，能一把锁解决就不要嵌套；避免在持锁时调用外部未知代码。已经发生时用 `jstack` 看 `Found one Java-level deadlock`。

### 2. 并发关键字

#### 9. `synchronized` 关键字有什么作用？

内置锁，保证同一时刻只有一个线程执行被保护的代码，同时保证进入和退出同步块时的可见性。它是可重入的，同一个线程可以再次拿到自己持有的锁。

可以修饰实例方法、静态方法，也可以写同步代码块并指定锁对象。锁的是对象，不是代码。

#### 10. `synchronized` 修饰普通方法和静态方法有什么区别？

- 普通方法：锁是当前实例 `this`。不同对象的锁互不影响。
- 静态方法：锁是这个类的 `Class` 对象。所有实例共享这一把锁。

实例方法和静态方法用的不是同一把锁，所以它们可以同时执行。要互斥，两边必须锁同一个对象。

#### 11. `synchronized` 和 `Lock` 有什么区别？

`Lock` 一般指 `ReentrantLock`。

| | synchronized | Lock |
|--|----------------|------|
| 释放 | 出同步块自动释放 | 必须 `unlock`，放在 `finally` |
| 等待 | 不能中断 | `lockInterruptibly` |
| 尝试 | 没有 | `tryLock` 可以超时 |
| 公平 | 非公平 | 可选公平锁 |
| 条件 | 一个等待队列 | 多个 `Condition` |
| 实现 | JVM 监视器 | AQS |

简单同步用 `synchronized`。需要试锁、可中断、多条件队列时用 `ReentrantLock`。

#### 12. `volatile` 关键字有什么作用？

保证可见性和禁止指令重排序，不保证原子性。

- 一个线程写了 `volatile` 变量，其他线程之后的读能看到这个新值，不会一直拿工作内存里的旧副本。
- 写之前的操作不会被重排到写之后，读之后的操作不会被重排到读之前。双重检查锁单例必须把实例声明为 `volatile`，就是为了避免对象没初始化完就被其他线程看到。

#### 13. `volatile` 能否保证原子性？

不能。`count++` 是读、加一、写回三步。volatile 只能保证每一步读写本身的可见性，不能保证三步不被别的线程插进来。两个线程同时读到 0，都会写成 1。

计数用 `AtomicInteger` 或加锁。volatile 适合状态标志，例如 `boolean running`。

#### 14. 什么是可见性、有序性和原子性？

- 原子性：一段操作要么全做完，要么看起来没做，中间状态不能被别人看见。`synchronized` 和 CAS 可以保证。
- 可见性：一个线程的写入，其他线程能及时看到。`volatile`、解锁、`final` 初始化都和可见性有关。
- 有序性：程序实际执行顺序在并发观察下符合预期。CPU 和编译器会重排指令，`volatile` 和锁通过内存屏障限制重排。

#### 15. 什么是 Java 内存模型（JMM）？

JMM 是一套规范，规定线程之间通过内存交互时，哪些写入必须对其他线程可见。它不是堆、栈那些内存区域。

每个线程可以有自己的工作内存副本。没有 happens-before 关系时，不能假设另一个线程一定看到了最新值。`volatile`、`synchronized`、锁、线程启动和加入，都会建立这样的关系。

#### 16. 什么是 happens-before 原则？

如果操作 A happens-before 操作 B，那么 A 的结果对 B 可见，A 的顺序也不会被重排到 B 后面。

常见规则：

- 程序顺序：同一个线程里，前面的代码 happens-before 后面的代码。
- 监视器锁：`unlock` happens-before 之后对同一把锁的 `lock`。
- volatile：写 happens-before 之后的读。
- 线程启动：`start()` happens-before 新线程里的任何操作。
- 线程终止：线程里的操作 happens-before 另一个线程从这个线程 `join` 成功返回。
- 传递性：A 在 B 之前、B 在 C 之前，则 A 在 C 之前。

#### 17. `AtomicInteger` 是如何保证线程安全的？

内部用 `volatile` 的 `int` 保证可见性，自增等操作用 CAS：比较内存里的值是不是期望值，是就把新值写进去。如果别的线程已经改过，这次就失败，重新读再试。

CAS 是 CPU 原子指令，不需要加重量级锁。高冲突时会空转，吞吐量下降。JDK 8 起部分原子类用 `LongAdder` 的分段思想，把热点拆开，更适合高并发计数。`AtomicInteger` 只能保证这一个变量的原子更新，不能把多个业务步骤合成一个事务。

### 3. 线程池

#### 18. 什么是线程池？为什么需要线程池？

预先创建一些线程，反复领取任务执行。相比每来一个请求就 `new Thread`：

- 省掉反复创建和销毁线程的成本。
- 线程数有上限，避免把内存和 CPU 打满。
- 任务可以排队，并统一处理拒绝、命名、异常和监控。

生产代码用 `ThreadPoolExecutor` 显式创建。`Executors.newFixedThreadPool` 的队列是无界的，任务堆积会撑满内存；`newCachedThreadPool` 线程数可以无限增长。

#### 19. Java 线程池有哪些核心参数？

`ThreadPoolExecutor` 七个参数：

- `corePoolSize`：核心线程数，平时保留。
- `maximumPoolSize`：线程数上限。
- `keepAliveTime` 和 `unit`：非核心线程空闲多久后回收。
- `workQueue`：任务队列，应使用有界队列。
- `threadFactory`：创建线程，建议起有意义的名字。
- `handler`：队列和线程都满了之后的拒绝策略。

#### 20. `execute()` 和 `submit()` 有什么区别？

`execute(Runnable)` 没有返回值，任务里的异常会交给线程的未捕获异常处理器。`submit` 返回 `Future`，可以 `get` 结果。任务抛出的异常被包进 `Future`，如果从来不 `get`，异常就被吞掉。需要结果或需要确认失败时用 `submit`，并且要处理 `get` 的异常。

#### 21. 线程池的任务执行流程是什么？

1. 工作线程数小于核心线程数：直接新建线程执行，即使有空闲线程也这样（默认）。
2. 核心线程已满：任务进入队列。
3. 队列也满了，且线程数还没到最大：再新建非核心线程执行。
4. 线程数也到了最大：执行拒绝策略。

所以默认不是“核心线程忙不过来就加线程”，而是先排队。队列如果无界，最大线程数就永远用不上。

#### 22. 线程池有哪些常见拒绝策略？

- `AbortPolicy`：默认，抛 `RejectedExecutionException`。
- `CallerRunsPolicy`：由提交任务的线程自己跑，形成反压。
- `DiscardPolicy`：默默丢掉新任务。
- `DiscardOldestPolicy`：丢掉队列里最老的任务，再尝试提交。

丢任务前要确认业务能接受。更常见的是有界队列配合 `CallerRunsPolicy` 或自己实现拒绝逻辑并打日志、告警。

#### 23. 如何合理设置线程池的核心线程数和最大线程数？

先分任务类型。

- CPU 密集：线程数接近 `CPU 核数` 或 `核数 + 1`。太多只会增加切换。
- IO 密集：线程经常在等数据库、HTTP，可以多一些。经验公式是 `核数 * (1 + 等待时间 / 计算时间)`。

队列用有界的，例如 `ArrayBlockingQueue`。最大线程数留给突发，不要和核心线程数差得没有依据。最终以压测的 RT、CPU、队列长度为准，而不是套一个固定数字。定时任务、普通业务、调用大模型这几类应拆成不同线程池，避免互相拖死。

#### 24. `ThreadLocal` 是什么？有什么应用场景？

每个线程存一份自己的变量，线程之间互不干扰。`Thread` 里有一个 `ThreadLocalMap`，key 是 `ThreadLocal` 对象，value 是该线程的值。

场景：保存当前登录用户、traceId、事务里的数据库连接、把非线程安全的 `SimpleDateFormat` 做成线程内复用。Spring 事务能在 Service 的多个 Mapper 调用里用到同一个连接，靠的就是把连接绑在当前线程上。

#### 25. 使用 `ThreadLocal` 为什么需要注意内存泄漏？

`ThreadLocalMap` 的 key 是弱引用，value 是强引用。`ThreadLocal` 对象如果没有别的强引用，GC 后 key 会变成 null，但 value 还在。线程如果很快结束，这点内存会一起释放。

线程池里的线程是复用的，不会结束。value 就会一直留着，下次这个线程还可能读到上一个请求的数据。使用完必须在 `finally` 里 `remove()`。拦截器或过滤器里设置的用户上下文、traceId，请求结束时都要清掉。
