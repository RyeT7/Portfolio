import { Floor } from "./types"

export function Elevator(props: { floors: Floor[] }) {
    return (
        <>
            {
                props.floors.flatMap((floor: Floor) => {
                    return (
                        floor.Component && <floor.Component key={floor.id} />
                    )
                })
            }
        </>
    )
}