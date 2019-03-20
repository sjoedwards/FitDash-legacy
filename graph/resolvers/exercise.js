const Exercise = {
    Exercise: {
        __resolveType(exercise) {
            if (exercise.session) {
                return 'SessionExercise';
            }
            if (exercise.workout) {
                return 'WorkoutExercise';
            }
        }
    },
};

export default Exercise;