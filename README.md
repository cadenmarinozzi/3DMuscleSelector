# 3DMuscleSelector

This is a component for a larger project since none seem to exist.

# Muscles

The muscles that are included are:

-   Biceps
-   Forearms
-   Triceps
-   Deltoid (Shoulder)
-   Pectoralis (Chest)
-   Abs & Obliques
-   Latissius Dorsi
-   Trapezius
-   Quadraceps
-   Hamstring
-   Calves
-   Gluteus Maximus (Butt)

# Model

The model is stored in [./models/](models/bodyMuscles.glb) and can be used in any project that supports glTF.

## Model Structure

Selectable nodes with one muscle group are named as follows:

-   MUSCLE\_{MUSCLE_NAME} - The main mesh for the muscle

Selectable nodes with two muscle groups are named as follows:

-   MUSCLE\_{MUSCLE_NAME}\_1 - The first
-   MUSCLE\_{MUSCLE_NAME}\_2 - The second

The model contains a hiearchy as follows:

-   \<Group> Scene
    -   \<Object3D> Sketchfab_model
        -   \<Object3D> root
            -   \<Object3D> GLTF_SceneRootNode
                -   \<Object3D> Sketchfab_model_0
                    -   \<Object3D> d1a529341e2746fcb4ff52d62b88febefbx_1
                        -   \<Object3D> RootNode_2
                            -   \<Object3D> body012_2_3
                                -   \<Object3D> body012_2_body012_2_0_4
                                    -   \<Mesh> BODY - The main body mesh
                                    -   \<Mesh> MUSCLE_ABS - The abs mesh which includes the obliques
                                    -   \<Mesh> MUSCLE_BICEPS - The biceps mesh
                                    -   \<Mesh> MUSCLE_CALF_1 - The first calf mesh
                                    -   \<Mesh> MUSCLE_CALF_2 - The second calf mesh
                                    -   \<Mesh> MUSCLE_DELTS - The deltoid mesh
                                    -   \<Mesh> MUSCLE_FOREARMS - The forearm mesh
                                    -   \<Mesh> MUSCLE_GLUTE_1 - The first glute mesh
                                    -   \<Mesh> MUSCLE_GLUTE_2 - The second glute mesh
                                    -   \<Mesh> MUSCLE_HAM_1 - The first hamstring mesh
                                    -   \<Mesh> MUSCLE_HAM_2 - The second hamstring mesh
                                    -   \<Mesh> MUSCLE_LAT_1 - The first latissimus dorsi mesh
                                    -   \<Mesh> MUSCLE_LAT_2 - The second latissimus dorsi mesh
                                    -   \<Mesh> MUSCLE_PECS - The pectoralis mesh
                                    -   \<Mesh> MUSCLE_QUAD_1 - The first quad mesh
                                    -   \<Mesh> MUSCLE_QUAD_2 - The second quad mesh
                                    -   \<Mesh> MUSCLE_TRAP_1 - The first trapezius mesh
                                    -   \<Mesh> MUSCLE_TRAP_2 - The second trapezius mesh
                                    -   \<Mesh> MUSCLE_TRICEPS - The triceps mesh

## Model Notes

The original sculputed model can be found [here](https://skfb.ly/oCwwG). I then exported the model to glTF and used Blender to add the muscle groups. The model is not perfect and some of the muscle groups are not perfect. I have tried to make the muscle groups as accurate as possible but I am not a professional modeler.
