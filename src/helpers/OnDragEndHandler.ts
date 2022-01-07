import { DropResult } from 'react-beautiful-dnd';
import { ITask } from '../interfaces/Task';
import { useTareas } from '../hooks/useTareas';

export const useOnDragEndHandler = () => {
  const { intercambiarIdsTarea, actualizarEstadoDeTarea } = useTareas();

  const onDragEndHandler = ({ source, destination }: DropResult, tasks: ITask[]) => {
    if (!destination) {
      return;
  }

  if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
  ) {
      return;
  }

  const start = source.droppableId;
  const finish = destination.droppableId;
  
  if (start === finish) {
    var items = tasks.slice();
    var reorderedItem = items.find((el) => el.id_task === source.index);
    var destinationItem = items.find((el) => el.id_task === destination.index);
    const restTasks = items.filter((item) => {
      return !(
        item.id_task === reorderedItem?.id_task ||
      item.id_task === destinationItem?.id_task
      );
    });
    var temp = reorderedItem?.id_task;
  
    reorderedItem = {
      ...reorderedItem,
      id_task: destinationItem!.id_task,
    };
    destinationItem = {
      ...destinationItem,
      id_task: temp,
    };
  
    items = [...restTasks, reorderedItem, destinationItem];
  intercambiarIdsTarea(source.index,destination.index);
    return items;
  }

  var itemsTasks = tasks.slice();
  var draggedTask = itemsTasks.find((el) =>  el.id_task === source.index)
  const restofTasks = itemsTasks.filter((item) => {
    return item.id_task !== draggedTask?.id_task;
  });
  draggedTask = {
    ...draggedTask,
    fk_state: Number(finish),
  }
  itemsTasks = [...restofTasks, draggedTask];
  if (draggedTask) {

    actualizarEstadoDeTarea(draggedTask.id_task!, Number(finish))
  }
  return itemsTasks
  }
  return {
    onDragEndHandler
  }
}
