## three.js

面试官您好。我是冯明哲，目前在字节工作，主要负责开发和维护内部的ToB平台，平常开发使用的技术栈是 React + TypeScript。

之前有使用three.js进行开发的经验，主要内容是利用等距柱状投影图实现全景小行星入场动画及实验室内部全景的展示，实现方式是 **修改像机fov和相机的坐标**实现动画效果，使用**轨道控制器OrbitControls.js**支持鼠标拖动查看室内详情。

最近刚完成的一项工作是将平台改造为微前端项目，负责主应用的开发，包括登录、首页等，取得的成绩首先站在开发侧是代码部署时间明显缩短，之前上线一个项目需要半个小时，现在缩短为5分钟，方便快速解决线上问题，还有就是之前的项目是全栈项目，没有做到前后端分离，接口联调需要前端写一个中间件然后再去调后端的接口，层级较深，出现问题不好定位，微前端改造之后，可以直接调后端接口，也可以走全栈的方式，方便问题定位。站在用户的角度，进行了很多的产品升级，比如添加tab页收藏和功能搜索更方便用户查找到所需内容，加载速度更快等。

热力图：埋点 + html2canvas

智慧城市：

​	加载城市模型：blender GIS basemap + OSM 下载地图 + 调整缩放

​	背景天空盒：加载全景图

​	添加交互效果：点击选取到物体

​	给建筑物添加渐变色：

​	给建筑物添加外围线条：

​	给建筑物添加扫描线：

​	给建筑物添加场景扫描线：

​	雷达效果：

​	透明墙：

​	地面扩散：

​	扩散半球：

​	旋转四棱锥：

​	飞线：

​	路径移动：

​	场景文字：

​	天气：

​	跟随鼠标缩放：

​	烟雾预警：

### 请解释three.js是什么，以及它为什么会被广泛使用？

Three.js 是一个用于创建和展示 3D 图形的 JavaScript 库。它提供了一组强大的工具和功能，使开发人员能够在 Web 浏览器中轻松地创建交互式的 3D 场景和应用程序。
Three.js 的主要特点包括：

- 跨平台兼容性： Three.js 可以在不同的平台上运行，包括桌面浏览器、移动设备和虚拟现实设备。它利用 WebGL 技术，通过浏览器的图形加速功能来呈现高性能的 3D 图形。
- 简化的 API： Three.js 提供了一个简单而直观的 API，使开发人员可以方便地创建和操作 3D 对象、材质、灯光、相机等元素。它抽象了复杂的 WebGL 编程，使创建 3D 场景变得更加容易和可靠。
- 丰富的功能集： Three.js 提供了丰富的功能集，包括几何形状的创建和变换、纹理映射、光照和阴影效果、动画、粒子系统等。这些功能使开发人员能够实现各种复杂的 3D 效果和交互。
- 活跃的社区支持： Three.js 拥有一个活跃的开发者社区，提供了大量的文档、示例代码和教程，以及开源项目的贡献和支持。这使得开发人员可以快速入门，并在开发过程中获取帮助和解决问题。
  Three.js 被广泛使用的原因有以下几点：
- Web 上的 3D 可视化需求： 随着 Web 技术的发展，越来越多的应用程序需要在网页上展示复杂的 3D 图形和交互效果。Three.js 提供了一种方便且高效的方式来实现这些需求，因此成为了许多开发人员的首选。
- 易用性和学习曲线低： Three.js 的 API 设计简单易懂，提供了大量的文档和示例，使得初学者能够快速入门，并且可以逐步深入学习和掌握更高级的功能。这降低了学习曲线，使得更多的开发人员可以开始使用和探索 3D 图形编程。
- 活跃的社区和生态系统： Three.js 拥有一个庞大的社区支持，开发人员可以从社区中获取帮助、分享经验，并使用社区贡献的插件和扩展来扩展 Three.js 的功能。这种活跃的社区使得开发人员能够更好地解决问题，提高开发效率。
- 开源和自由： Three.js 是一个开源项目，它基于 MIT 许可证发布，这意味着开发人员可以免费使用、修改和分发 Three.js 的源代码。这使得开发人员能够自由地将 Three.js 集成到他们的项目中，并根据自己的需求进行定制和扩展。

### 请解释three.js中的WebGL和Canvas的区别？

WebGL 和 Canvas 是 HTML5 中用于绘制图形的两个不同的技术。

1、Canvas： Canvas 是一个 HTML5 元素，它提供了一个基于像素的绘图表面，可以通过 JavaScript 来绘制 2D 图形。Canvas 使用 HTML5 的 2D 上下文（Context）API，通过绘制路径、填充颜色、设置样式等操作来创建和渲染图形。Canvas 适用于简单的 2D 图形绘制，例如绘制图表、图像编辑等。Canvas 绘制的图形是基于像素的，因此无法直接处理复杂的 3D 图形。

2、WebGL： WebGL 是一种基于 OpenGL ES 2.0 的 JavaScript API，它允许在支持 WebGL 的浏览器中进行硬件加速的 2D 和 3D 图形渲染。WebGL 提供了直接访问图形硬件的能力，可以通过 JavaScript 控制图形渲染管线，从而实现高性能的 3D 图形渲染。WebGL 使用了一种基于三角形的图元绘制方式，可以通过顶点、纹理坐标、着色器程序等来定义和渲染复杂的 3D 场景。Three.js 是建立在 WebGL 之上的库，简化了使用 WebGL 进行 3D 图形编程的复杂性。

综上所述，Canvas 是基于像素的 2D 绘图技术，适用于简单的 2D 图形绘制。而 WebGL 是一种基于 OpenGL ES 2.0 的 JavaScript API，提供了硬件加速的 2D 和 3D 图形渲染能力，适用于复杂的 3D 场景渲染。在 Three.js 中，它使用 WebGL 来实现高性能的 3D 图形渲染，并提供了更高层次的抽象和功能，使开发人员更轻松地创建和交互式地展示 3D 场景。

### 请解释three.js中的Scene、Camera和Renderer的作用？

在 Three.js 中，Scene（场景）、Camera（相机）和Renderer（渲染器）是三个核心组件，它们在创建和呈现 3D 场景时扮演着不同的角色。

Scene（场景）： 场景是 Three.js 中的容器，用于存放和组织 3D 对象、光源、背景等元素。通过创建场景，您可以定义和管理场景中的所有对象和效果。场景是构建 3D 场景的基础，您可以向场景中添加物体、光源、特效等，以创建您想要的可视化效果。

Camera（相机）： 相机决定了场景中的可视范围和观察角度。它定义了从何处观察场景以及投影的方式。在 Three.js 中，有几种相机类型可供选择，如透视相机（PerspectiveCamera）和正交相机（OrthographicCamera）。相机决定了最终渲染图像的视角和投影效果。

Renderer（渲染器）： 渲染器负责将场景和相机中的 3D 元素渲染成最终的图像或动画。它使用 WebGL 或其他渲染后端技术（如 CSS 2D/3D 渲染）来执行实际的渲染过程。渲染器将场景中的几何对象、材质、灯光等元素结合相机的视角进行处理，并生成最终的渲染结果，将其呈现在屏幕上。

工作流程通常如下：首先，您创建一个场景，并在场景中添加物体、光源和相机。然后，您选择合适的相机类型，并设置相机的位置和方向以及其他参数。最后，您创建一个渲染器，并将场景和相机作为参数传递给渲染器的渲染方法，以生成最终的渲染结果。

通过这三个核心组件的配合使用，您可以创建出逼真的 3D 场景，并将其渲染到屏幕上，实现交互式的 3D 图形应用程序。

### 请描述three.js中的常见几何体（例如立方体、球体、圆柱体等）是如何被创建的？

在 Three.js 中，常见的几何体可以通过使用预定义的几何体构造函数来创建。这些构造函数位于 THREE 对象下，您可以使用它们来创建各种几何体对象。
以下是一些常见几何体的创建示例：
立方体（Cube）：

```javascript
var geometry = new THREE.BoxGeometry(width, height, depth);
```

其中，width、height 和 depth 分别代表立方体的宽度、高度和深度。
球体（Sphere）：

```javascript
var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
```

其中，radius 代表球体的半径，widthSegments 和 heightSegments 分别代表经度和纬度上的分段数，用于控制球体的平滑程度。
圆柱体（Cylinder）：

```javascript
var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
```

其中，radiusTop 和 radiusBottom 分别代表圆柱体顶部和底部的半径，height 代表圆柱体的高度，radialSegments 代表圆柱体周围的分段数。
除了这些常见几何体外，Three.js 还提供了许多其他几何体的构造函数，如平面（PlaneGeometry）、圆环（TorusGeometry）、圆锥体（ConeGeometry）等。您可以根据您的需求选择合适的几何体构造函数，并传递相应的参数来创建几何体对象。
创建几何体后，您可以进一步对其进行操作，如应用材质、变换位置、旋转、缩放等。几何体通常会与材质和纹理结合使用，并添加到场景中进行渲染。

### 请解释three.js中的材质（Material）和纹理（Texture）的区别？

在 Three.js 中，材质（Material）和纹理（Texture）是用于定义和渲染 3D 对象外观的两个关键概念，它们有着不同的作用。
材质（Material）： 材质定义了对象的表面特性，如颜色、光滑度、反射率、透明度等。材质描述了对象在光照条件下的外观，并确定了如何对光线进行反射和折射。在 Three.js 中，有许多不同类型的材质可供选择，例如基本材质（MeshBasicMaterial）、Lambert 材质（MeshLambertMaterial）、Phong 材质（MeshPhongMaterial）等。每种材质类型都具有不同的属性和效果，可以根据需求进行选择和配置。
纹理（Texture）： 纹理是一种图像或图案，可以应用到材质的表面上，以增强对象的外观。纹理可以用于给对象添加颜色、图案、细节等。通过将纹理映射到几何体的表面上，可以实现更加逼真的渲染效果。在 Three.js 中，可以使用 THREE.Texture 类来创建纹理对象，然后将其应用到材质的相应属性上，例如 map 属性。纹理可以从图像、视频、画布等来源创建，并可以进行各种配置，如重复、平铺、过滤等。
综上所述，材质定义了对象的外观特性，如颜色、光照效果等，它们决定了对象如何与光交互。而纹理是一种图像或图案，用于给材质的表面增加细节和图案，以增强对象的外观。您可以将纹理应用到材质的属性上，以实现更加逼真的渲染效果。材质和纹理通常一起使用，使得 3D 对象能够呈现出具有细节和纹理的外观。

### 请解释three.js中的几何变换（例如平移、旋转、缩放等）如何实现？

在 Three.js 中，您可以通过对对象应用不同的几何变换来实现平移、旋转、缩放等操作。这些几何变换可通过对象的属性进行控制，例如 position、rotation 和 scale。下面是几种常见的几何变换的示例：

1. 平移（Translation）：
   要对对象进行平移，您可以通过设置对象的 position 属性来改变其位置。position 属性是一个 THREE.Vector3 对象，它表示对象在三维空间中的位置坐标。通过修改 position 的 X、Y、Z 值，您可以实现对象的平移。
   示例代码：

```javascript
// 平移对象
object.position.x = 2; // 沿 X 轴平移 2 个单位
object.position.y = -1; // 沿 Y 轴平移 -1 个单位
object.position.z = 3; // 沿 Z 轴平移 3 个单位
```

2. 旋转（Rotation）：
   要对对象进行旋转，您可以通过设置对象的 rotation 属性来改变其旋转角度。rotation 属性是一个 THREE.Euler 对象，它表示对象的旋转角度。通过修改 rotation 的 X、Y、Z 值，您可以实现对象的绕不同轴的旋转。
   示例代码：

```javascript
// 绕 Y 轴旋转对象
object.rotation.y = Math.PI / 2; // 旋转 90 度
```

3. 缩放（Scaling）：
   要对对象进行缩放，您可以通过设置对象的 scale 属性来改变其尺寸。scale 属性是一个 THREE.Vector3 对象，它表示对象在三个轴向上的缩放比例。通过修改 scale 的 X、Y、Z 值，您可以实现对象的缩放效果。
   示例代码：

```javascript
// 对象在 X 轴上缩放为原来的两倍，其他轴保持不变
object.scale.x = 2;
```

需要注意的是，这些几何变换是相对于对象的本地坐标系进行的。如果要实现全局坐标系下的变换，可以通过设置对象的 position、rotation 和 scale 属性来实现。
除了直接修改对象的属性，Three.js 还提供了更高级的变换操作，例如矩阵变换、层级变换、骨骼动画等。您可以根据具体的需求选择适合的方法和技术来实现几何变换。

### 请描述three.js中如何加载外部模型（例如OBJ、FBX、GLTF等）？

在 Three.js 中，您可以使用不同的加载器来加载外部模型文件，如 OBJ、FBX、glTF 等。以下是加载不同类型模型的示例代码：

1. OBJ 模型加载：

```javascript
// 创建 OBJLoader 实例
var loader = new THREE.OBJLoader();

// 加载模型文件
loader.load(
    'model.obj', // 模型文件的 URL
    function(object) {
        // 加载成功后的回调函数
        scene.add(object); // 将加载的模型添加到场景中
    },
    function(xhr) {
        // 加载过程中的回调函数
        console.log((xhr.loaded / xhr.total * 100) + '% 已加载');
    },
    function(error) {
        // 加载失败时的回调函数
        console.error('模型加载失败', error);
    }
);
```

2. FBX 模型加载：

```javascript
// 创建 FBXLoader 实例
var loader = new THREE.FBXLoader();

// 加载模型文件
loader.load(
    'model.fbx', // 模型文件的 URL
    function(object) {
        // 加载成功后的回调函数
        scene.add(object); // 将加载的模型添加到场景中
    },
    function(xhr) {
        // 加载过程中的回调函数
        console.log((xhr.loaded / xhr.total * 100) + '% 已加载');
    },
    function(error) {
        // 加载失败时的回调函数
        console.error('模型加载失败', error);
    }
);
```

3. glTF 模型加载：

```javascript
// 创建 GLTFLoader 实例
var loader = new THREE.GLTFLoader();

// 加载模型文件
loader.load(
    'model.glb', // 模型文件的 URL
    function(gltf) {
        // 加载成功后的回调函数
        scene.add(gltf.scene); // 将加载的模型添加到场景中
    },
    function(xhr) {
        // 加载过程中的回调函数
        console.log((xhr.loaded / xhr.total * 100) + '% 已加载');
    },
    function(error) {
        // 加载失败时的回调函数
        console.error('模型加载失败', error);
    }
);
```

以上示例代码中，您需要根据实际情况替换模型文件的 URL，并根据需要对加载过程中的回调函数进行自定义。加载成功后，您可以将加载的模型对象添加到场景中，以进行后续的渲染和交互操作。
请注意，加载不同类型的模型可能需要相应的加载器。在使用之前，请确保已经正确引入加载器的 JavaScript 文件，并在加载模型之前实例化正确的加载器对象。


### 请解释如何在three.js中实现动画效果？

可以通过使用动画系统来实现对象的动画效果。Three.js 提供了 THREE.AnimationMixer、THREE.AnimationClip 和 THREE.AnimationAction 等类来处理动画相关的操作。下面是一个简单的示例代码，演示如何在 Three.js 中实现对象的平移动画效果：

```javascript
// 创建一个平移动画的关键帧序列
var keyframes = [
    { position: new THREE.Vector3(0, 0, 0) },
    { position: new THREE.Vector3(2, 0, 0) },
    { position: new THREE.Vector3(2, 2, 0) },
    { position: new THREE.Vector3(0, 2, 0) },
    { position: new THREE.Vector3(0, 0, 0) }
];

// 创建一个动画剪辑
var clip = new THREE.AnimationClip('animation', -1, [
    new THREE.VectorKeyframeTrack('.position', Object.keys(keyframes[0]), keyframes.map(kf => kf.position.toArray()).flat())
]);

// 创建一个动画混合器
var mixer = new THREE.AnimationMixer(object); // object 是要动画化的对象，例如一个 Mesh

// 创建一个动画动作
var action = mixer.clipAction(clip);

// 播放动画
action.play();
```

在示例代码中，我们首先创建了一个平移动画的关键帧序列 keyframes，它包含了一系列位置信息。然后，我们使用这些关键帧创建了一个动画剪辑 clip，并将其添加到动画混合器 mixer 中。接下来，我们通过 clipAction 方法创建了一个动画动作 action，并将其与要动画化的对象关联起来。最后，我们调用 play 方法开始播放动画。
您可以根据需要调整关键帧的位置、旋转、缩放等属性，以实现更复杂的动画效果。此外，Three.js 还支持更高级的动画功能，如骨骼动画和相机动画等。您可以参考 Three.js 的文档和示例，了解更多关于动画的用法和技巧。
请注意，在使用动画效果之前，您需要确保已经正确加载和设置了对象的几何体、材质和纹理等。同时，您还需要在渲染循环中更新动画混合器的状态，以保证动画的播放和更新。

### 请解释three.js中的交互控制器（例如鼠标控制器、手势控制器等）是如何实现的？

在 Three.js 中，交互控制器用于处理用户与场景交互的输入，例如鼠标、触摸和手势等。Three.js 提供了多种交互控制器，包括鼠标控制器、触摸控制器、轨道控制器等，它们基于不同的输入方式来实现交互功能。
这些交互控制器都是 Three.js 中的独立类，它们提供了一组方法和事件来处理用户输入，并改变场景中的相机位置和视角等属性。以下是一些常见的交互控制器及其实现方式：

1. 鼠标控制器（THREE.OrbitControls）：
   鼠标控制器允许用户通过鼠标拖拽来旋转、缩放和平移相机。它基于鼠标的移动和点击事件来控制相机的位置和视角。
   示例代码：

```javascript
// 创建鼠标控制器
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// 在渲染循环中更新控制器
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
```

2. 触摸控制器（THREE.TrackballControls）：
   触摸控制器允许用户通过触摸手势来旋转、缩放和平移相机。它基于触摸事件和手势事件来控制相机的位置和视角。
   示例代码：

```javascript
// 创建触摸控制器
var controls = new THREE.TrackballControls(camera, renderer.domElement);

// 在渲染循环中更新控制器
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
```

3. 轨道控制器（THREE.FirstPersonControls）：
   轨道控制器允许用户通过鼠标和键盘来控制相机，类似于第一人称视角的控制方式。它基于鼠标和键盘的输入事件来控制相机的位置和视角。
   示例代码：

```javascript
// 创建轨道控制器
var controls = new THREE.FirstPersonControls(camera, renderer.domElement);

// 在渲染循环中更新控制器
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
```

通过创建相应的交互控制器并将其绑定到场景中的相机上，您可以实现不同的交互方式，使用户能够与场景进行交互操作。在渲染循环中，通过调用控制器的 update 方法来更新控制器的内部状态，以响应用户输入。
需要注意的是，不同的交互控制器可能需要额外的库文件支持，例如 OrbitControls 和 TrackballControls 需要加载并引入 OrbitControls.js 和 TrackballControls.js 脚本文件。在使用交互控制器之前，请确保已正确加载所需的脚本文件，并设置好相应的事件监听器。

### 请描述您在使用three.js时遇到的最大挑战是什么，以及您是如何克服它的？

- 复杂的 API 和文档: Three.js 是一个功能强大且灵活的库，其 API 和文档非常丰富。对于初学者来说，掌握和理解这些概念可能是一项挑战。
  - 克服方法: 首先，建议仔细阅读 Three.js 的官方文档，并参考示例代码。文档提供了对库的详细说明和示例，有助于理解 Three.js 的主要概念和用法。其次，建议阅读一些优秀的教程和书籍，这些资源通常提供了更为深入和实践性的指导。最重要的是，通过实践和尝试，不断积累经验和理解，逐渐掌握 Three.js 的使用。
- 性能优化: 在处理复杂场景、大量对象或高质量纹理等情况下，Three.js 可能面临性能方面的挑战。渲染效率的提升和优化是一个重要的任务。
  - 克服方法: 为了优化性能，可以采取以下一些方法：合并几何体和材质以减少渲染调用的数量；使用纹理集合和纹理压缩来减少内存使用和网络加载；使用 Level of Detail (LOD) 等技术来管理复杂度；使用 Web Workers 进行异步计算；避免不必要的计算和更新等。通过对性能优化的研究和实践，可以提高 Three.js 应用程序的效率和流畅性。
- 跨浏览器和设备兼容性: 由于不同浏览器和设备对 WebGL 和相关技术的支持程度不同，兼容性问题可能会导致应用程序在某些平台上无法正常工作。
  - 克服方法: 在开发过程中，建议进行跨浏览器和设备的测试，并了解不同平台的兼容性要求和限制。可以使用工具和库来处理兼容性问题，例如 Modernizr、WebGL Detector 等。另外，定期关注 Three.js 的更新和修复版本，以获取最新的兼容性改进和修复。
- 复杂的场景管理: 在处理复杂的场景、对象层级以及动画效果时，场景管理和对象之间的交互可能变得复杂和困难。
  - 克服方法: 使用适当的组织架构和设计模式来管理场景和对象，例如分层结构、对象容器、场景图等。合理使用场景图、组和对象等 Three.js 提供的功能，可以更好地组织和管理场景中的对象。此外，使用合适的动画系统和交互控制器来简化动画效果的实现和交互操作。
    这些是在使用 Three.js 时可能遇到的一些挑战和克服方法。对于每个开发者来说，挑战可能会因项目需求和个人经验而有所不同。通过不断学习、实践和与社区交流，可以克服这些挑战并更好地利用 Three.js 的能力。

### 实践

```js
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import TWEEN from '@tweenjs/tween.js';

function ThreeScene(): React.ReactElement {
  const containerRef = useRef<any>(null);
  const animationRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);
  const meshRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;

    // Set up scene
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Set up camera
    const camera = new THREE.PerspectiveCamera(170, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 100, 0);
    cameraRef.current = camera;

    function onWindowResize(): void {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize);

    // Set up controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = -1; // 反转鼠标操作
    controls.enableDamping = true;
    controls.dampingFactor = 1.4;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0;
    controls.enablePan = false;
    controls.enableRotate = false;
    controlsRef.current = controls;

    // Set up sphere
    const geometry = new THREE.SphereGeometry(100, 100, 100);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('https://tosv.boe.byted.org/obj/ies-image/vida_files/400c6901295cea4b0dafaa7d6f2ee309.jpg'),
      // side: THREE.BackSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    // Start animation loop
    const animate = (): void => {
      animationRef.current = requestAnimationFrame(animate);
      TWEEN.update();
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return (): void => {
      cancelAnimationFrame(animationRef.current);
      container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const onLoad = (): void => {
      setIsLoading(false);
    };

    const onError = (): void => {
      console.error('Failed to load texture');
    };

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('https://tosv.boe.byted.org/obj/ies-image/vida_files/400c6901295cea4b0dafaa7d6f2ee309.jpg', onLoad, undefined, onError);
  }, []);



  useEffect(() => {
    if (!isLoading) {
      meshRef.current.visible = true;
      controlsRef.current.enabled = true;

      const camera = cameraRef.current;
      const mesh = meshRef.current;

      const duration = 2000; // 动画持续时间，单位为毫秒

      const tween = new TWEEN.Tween({
        fov: 170,
        ars: 40,
        rot: 0
      })
        .to({
          fov: 130,
          ars: 0,
          rot: Math.PI * 1.01
        }, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(function () {
          controlsRef.current.enableRotate = false;
          controlsRef.current.enableZoom = false;
          TWEEN.remove(tween);
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          currentIn();
        })
        .onUpdate(tween => {
          camera.fov = tween.fov;
          camera.updateProjectionMatrix();
          mesh.rotation.y = tween.rot;
        })
        .start();

      // 添加一个新的Tween，自动旋转全景图
      const rotateTween = (): void => {
        new TWEEN.Tween(mesh.rotation)
          .to({ y: mesh.rotation.y + Math.PI * 2 }, 200000)
          .repeat(Infinity)
          .start();
      };

      const currentIn = (): void => {
        const mesh = meshRef.current;
        const camera = cameraRef.current as any;
        controlsRef.current.enableRotate = false;
        controlsRef.current.enableZoom = false;
        mesh.rotation.y = Math.PI * 1.01;
        const target = new THREE.Vector3();
        const tween = new TWEEN.Tween({
          fov: camera.fov,
          z: 0,
          cy: camera.position.y,
        })
          .to({
            fov: 70,
            z: -100,
            cy: 0,
          }, 4000)
          .easing(TWEEN.Easing.Linear.None)
          .onComplete(function () {
            const targetFinally = new THREE.Vector3(0, 0, 0);
            controlsRef.current.target = targetFinally;
            controlsRef.current.update();
            controlsRef.current.enableRotate = true;
            controlsRef.current.enableZoom = false;
            TWEEN.remove(tween);
            rotateTween();
          })
          .onUpdate(function (tween) {
            camera.position.y = tween.cy;
            camera.fov = tween.fov;
            mesh.rotation.y += 0.005;
            target.set(0, 0, tween.z);
            camera.lookAt(target);
            controlsRef.current.target = target;
            controlsRef.current.update();
            camera.updateProjectionMatrix();
          })
          .start();
      };
    }
  }, [isLoading]);

  return <div ref={containerRef} id={'containerRef'} />;
}

export default ThreeScene;
```