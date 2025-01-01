const express = require('express')
const apicache = require('apicache')

const workoutController = require('../../controllers/workoutController')
const recordController = require('../../controllers/recordController')

const router = express.Router()
const cache = apicache.middleware

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */
router.get('/', cache('2 minutes'), workoutController.getAllWorkouts)

/**
 * @openapi
 * /api/v1/workouts/{workoutId}:
 *   get:
 *     tags:
 *       - Workouts
 *     summary: Get a single workout by ID
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the workout to retrieve
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Workout 1
 *                     mode:
 *                       type: string
 *                       example: cardio
 *                     equipment:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["dumbbell", "barbell"]
 *                     exercises:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["squat", "bench press"]
 *                     trainerTips:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Keep your back straight", "Breathe properly"]
 */
router.get('/:workoutId', workoutController.getOneWorkout)

/**
 * @openapi
 * /api/v1/workouts/{workoutId}/records:
 *   get:
 *     tags:
 *       - Records
 *     summary: Get records for a specific workout
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the workout to retrieve records for
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 1
 *                       workoutId:
 *                         type: string
 *                         example: 1
 *                       record:
 *                         type: string
 *                         example: "Record details"
 */
router.get('/:workoutId/records', recordController.getRecordForWorkout)

/**
 * @openapi
 * /api/v1/workouts:
 *   post:
 *     tags:
 *       - Workouts
 *     summary: Create a new workout
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Workout 1
 *               mode:
 *                 type: string
 *                 example: cardio
 *               equipment:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["dumbbell", "barbell"]
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["squat", "bench press"]
 *               trainerTips:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Keep your back straight", "Breathe properly"]
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Workout 1
 *                     mode:
 *                       type: string
 *                       example: cardio
 *                     equipment:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["dumbbell", "barbell"]
 *                     exercises:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["squat", "bench press"]
 *                     trainerTips:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Keep your back straight", "Breathe properly"]
 */
router.post('/', workoutController.createNewWorkout)

/**
 * @openapi
 * /api/v1/workouts/{workoutId}:
 *   put:
 *     tags:
 *       - Workouts
 *     summary: Update a workout by ID
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the workout to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Workout 1
 *               mode:
 *                 type: string
 *                 example: cardio
 *               equipment:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["dumbbell", "barbell"]
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["squat", "bench press"]
 *               trainerTips:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Keep your back straight", "Breathe properly"]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Workout 1
 *                     mode:
 *                       type: string
 *                       example: cardio
 *                     equipment:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["dumbbell", "barbell"]
 *                     exercises:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["squat", "bench press"]
 *                     trainerTips:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Keep your back straight", "Breathe properly"]
 */
router.put('/:workoutId', workoutController.updateOneWorkout)

/**
 * @openapi
 * /api/v1/workouts/{workoutId}:
 *   delete:
 *     tags:
 *       - Workouts
 *     summary: Delete a workout by ID
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the workout to delete
 *     responses:
 *       204:
 *         description: No Content
 */
router.delete('/:workoutId', workoutController.deleteOneWorkout)

module.exports = router