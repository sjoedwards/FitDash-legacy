const Item = {
    Item: {
        __resolveType(item) {
            if (item.routine) {
                return 'RoutineItem';
            }
            if (item.workout) {
                return 'WorkoutItem';
            }
        }
    },
};

export default Item;