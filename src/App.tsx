import { Elevator } from './elevator/Elevator.tsx';
import { floors } from './elevator/registry.ts';

export default function App() {
  return <Elevator floors={floors} />;
}
