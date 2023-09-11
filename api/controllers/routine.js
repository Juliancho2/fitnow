const routineRouter = require('express').Router()
const useValidate = require('../middleware/useValidate');
const userExtractor = require('../middleware/userExtractor')
const Routine = require('../models/Routine');
const User = require('../models/User');


routineRouter.get('/', userExtractor, async (request, response, next) => {
    try {
        const routine = await Routine.find({}).populate('user', {
            username: 1
        })

        response.json(routine);
    } catch (error) {
        next(error)
    }

});

routineRouter.post('/',useValidate, userExtractor, async (req, res) => {
    try {
      const { day, exersiceItem } = req.body;
      const userId = req.userId; // Se asume que req.userId contiene el ID del usuario
  
      const user = await User.findById(userId);
      const existingRoutine = await Routine.findOne({ user, day });
  
      if (existingRoutine) {
        const exerciseExists = existingRoutine.exersiceItem.some(
          (exercise) => exercise.id === exersiceItem.id
        );
  
        if (exerciseExists) {
          return res.status(400).json({ message: "Exercise already exists in routine" });
        }
  
        existingRoutine.exersiceItem.push(exersiceItem);
        await existingRoutine.save();
        res.json(existingRoutine);
      } else {
        const newRoutine = new Routine({
          user,
          day,
          exersiceItem: [exersiceItem],
        });
  
        const saveRoutine = await newRoutine.save();
        user.routine= user.routine.concat(saveRoutine._id);
        await user.save();
        res.json(saveRoutine);
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
    }
  });

routineRouter.delete('/:id/:name', userExtractor, async (req, res) => {
    const { id, name } = req.params;

    try {
        // Buscar la rutina por el nombre del día (name)
        const routine = await Routine.findOne({ day: name });

        if (!routine) {
            // Si no se encuentra la rutina, devolver un error 404
            return res.status(404).json({ message: 'Rutina no encontrada' });
        }

        // Filtrar los elementos de exersiceItem para eliminar el ejercicio por ID
        routine.exersiceItem = routine.exersiceItem.filter(item => item.id !== id);

        // Guardar la rutina actualizada en la base de datos
        await routine.save();

        res.status(204).end(); // Respondemos con éxito (sin contenido)
    } catch (error) {
        // Si ocurre un error, puedes manejarlo apropiadamente aquí
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

routineRouter.put('/:day',userExtractor, async (req, res) => {
  try {
    const { exerciseItem } =await req.body;
    const { day } =await req.params;
    const userId=await req.userId

    const user = await User.findById(userId);
    const routine = await Routine.findOne({ user,day: day });

    if (!routine) {
      return res.status(404).json({ error: 'Routine not found' });
    }
    // Encuentra el índice del ejercicio a editar en la rutina
    const exerciseIndex = routine.exersiceItem.findIndex((ex) => ex.id === exerciseItem.id);
    
    if (exerciseIndex === -1) {
      return res.status(404).json({ error: 'Exercise not found in routine' });
    }

    // Reemplaza el ejercicio existente con el nuevo ejercicio
    routine.exersiceItem[exerciseIndex] = exerciseItem;

    // Guarda la rutina actualizada
    const updatedRoutine = await routine.save();

    res.json(updatedRoutine);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = routineRouter;
