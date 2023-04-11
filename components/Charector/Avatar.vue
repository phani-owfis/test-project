<template>
  <div class="h-full flex-col flex overflow-hidden">
    <div class="grow">
      <!-- Start of character canvas  -->
      <div
        class="flex flex-cols h-full relative"
        :class="pending ? 'hidden' : ''"
      >
        <canvas ref="canvasRef" class="focus-visible:outline-0" />
      </div>
      <!-- End of character canvas -->

      <!-- Start of Loader  -->
      <div v-if="pending" class="flex items-center justify-center min-w-screen">
        <div
          class="w-10 h-10 border-purple-700 border-t-2 animate-spin rounded-full absolute top-[50%]"
        ></div>
      </div>
      <!-- End of Loader -->
    </div>
  </div>
  <AvatarHome class="w-full" @load-default="setEnv(canvasRef, character)" />
</template>
<script setup lang="ts">
import "@babylonjs/loaders/glTF";
import {
  Engine,
  Scene,
  Vector3,
  ArcRotateCamera,
  Color4,
  Color3,
  DirectionalLight,
  ShadowGenerator,
  Angle,
  Tools,
  AssetsManager,
  TransformNode,
  Texture,
} from "@babylonjs/core";

interface CharacterSchema {
  character: {
    path: string; // Gltf file path
    name: string; // Gltf file name
    transparency: boolean; // Option to load background or not
    backgroundColor: {
      sky: string;
      ground: string;
    };
    scaling?: {
      x: number;
      y: number;
      z: number;
    }; // Character direction
    lightPosition?: {
      x: number;
      y: number;
      z: number;
    }; // Light on character in which direction
    avatarPosition?: {
      x: number;
      y: number;
      z: number;
    }; // Position for character to be on scene
  };
}

const props = withDefaults(defineProps<CharacterSchema>(), {
  character: () => ({
    path: "emc2/avatar/3d/",
    name: "male.gltf",
    transparency: true,
    backgroundColor: {
      sky: "#ffffff",
      ground: "#ffffff",
    },
    scaling: {
      x: 0,
      y: 0,
      z: 0,
    },
    lightPosition: {
      x: 0,
      y: 0,
      z: 0,
    },
    avatarPosition: {
      x: 0,
      y: 0,
      z: 0,
    },
  }),
});
const canvasRef: any = ref(null); // Avatar Reference
const AssetManagerTask: any = ref(null);

const pending = ref(false); // Shows loader
const scene: any = ref(null);
const engine: any = ref(null);
const skeleton: any = ref(null);
let textures: any = [];

const customTexture: any = ref([]);
const customTextureIndex = ref(0);
const AssetManager: any = ref(null);
const shadowGenerator: any = ref(null);
const { $bus } = useNuxtApp();

// Load scene on page mount
onMounted(() => {
  setEnv(canvasRef.value, props.character);
});

const setEnv = async (canvas: any, character: any) => {
  pending.value = true;
  // Load Engine and Scene
  engine.value = new Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
  });
  scene.value = new Scene(engine.value);

  // Clear default scene background
  if (character.transparency) scene.value.clearColor = new Color4(0, 0, 0, 0);

  // Create Background environment
  if (character.backgroundColor) setBackground(scene.value, character);

  // Set character position
  setCameraPosition(scene.value, canvas);

  // Set light on character
  const directionalLight = setDirectionalLight(scene.value, character);

  // Load shadow based on the light
  shadowGenerator.value = setShadow(directionalLight);

  // Load character using assetmanger
  AssetManager.value = await loadAssetsManager(
    scene.value,
    character,
    shadowGenerator.value
  );

  // Renders the scene after loading the character
  engine.value.runRenderLoop(() => {
    if (scene.value) {
      if (!scene.value.isReady()) return false;

      scene.value.render();
    }
  });
};

// Loads the background while customizing the character
const setBackground = (scene: any, character: any) => {
  scene.createDefaultEnvironment({
    skyboxSize: 30,
    skyboxColor: Color3.FromHexString(character.backgroundColor.sky),
    groundColor: Color3.FromHexString(character.backgroundColor.ground),
    groundSize: 30,
    enableGroundShadow: true,
    enableGroundMirror: false,
    groundMirrorFallOffDistance: 8,
    groundMirrorBlurKernel: 64,
    groundShadowLevel: 0.5,
  });
};

// Set the character camera position
const setCameraPosition = (scene: any, canvas: HTMLElement) => {
  const camera = new ArcRotateCamera(
    "camera1",
    Tools.ToRadians(70),
    Tools.ToRadians(90),
    2.5,
    new Vector3(-0.5, 1, 0.3),
    scene
  );

  // Allow mouse controls
  camera.inputs.addMouseWheel();
  camera.inputs.addPointers();
  camera.alpha = Angle.FromDegrees(-90).radians();
  camera.target = new Vector3(0, 1.1, 0);
  camera.lowerRadiusLimit = 3;
  camera.upperRadiusLimit = 3.5;
  camera.wheelPrecision = 60;
  camera.wheelDeltaPercentage = 0.01;
  camera.upperBetaLimit = Math.PI / 2.2;
  camera.attachControl(canvas, true);
};

// Set light on character
const setDirectionalLight = (scene: any, character: any) => {
  const directionalLight = new DirectionalLight(
    "dir01",
    new Vector3(
      character.lightPosition.x,
      character.lightPosition.y,
      character.lightPosition.z
    ),
    scene
  );
  directionalLight.position = new Vector3(0, 6, 0);
  directionalLight.intensity = 3;
  return directionalLight;
};

// Generate shadow for light
const setShadow = (directionalLight: any) => {
  const shadowGenerator = new ShadowGenerator(512, directionalLight);
  shadowGenerator.useExponentialShadowMap = true;
  shadowGenerator.useKernelBlur = true;
  shadowGenerator.blurKernel = 64;
  return shadowGenerator;
};

// Loads the character
const loadAssetsManager = async (
  scene: any,
  character: any,
  shadowGenerator: any
) => {
  // AssetManager
  const assetsManager = new AssetsManager(scene);
  assetsManager.useDefaultLoadingScreen = false;
  assetsManager.onTaskSuccessObservable.add((task: any) => {
    // Loads character positon based on props
    task.loadedMeshes[0].position = new Vector3(
      character.avatarPosition.x,
      character.avatarPosition.y,
      character.avatarPosition.z
    );

    // Setup Scale & positions of character
    task.loadedMeshes[0].scaling = new Vector3(
      character.scaling.x,
      character.scaling.y,
      character.scaling.z
    );
    const loadingCharacter = new TransformNode("character_node");
    task.loadedMeshes[0].parent = loadingCharacter;
    shadowGenerator.addShadowCaster(task.loadedMeshes[0], true);
    skeleton.value = task.loadedMeshes[0];
    pending.value = false;
  });
  // Loads the chacter based on provided path
  AssetManagerTask.value = assetsManager.addMeshTask(
    "character_mesh",
    "",
    `/images/avatar/3d-glb/`,
    character.name
  );
  await assetsManager.loadAsync();
  return assetsManager;
};
</script>
