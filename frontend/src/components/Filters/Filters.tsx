import { useState } from "react";

type FiltersProps = {
    onFilter: (done?: boolean) => void
}

export const Filters = ({ onFilter }: FiltersProps) => {

    const [selectedFilter, setSelectedFilter] = useState<number>(0);

    const filter = (done: boolean | null) => {
        onFilter(done === null ? undefined : done);
        setSelectedFilter(done === null ? 0 : done ? 2 : 1)
    }

    return (
        <div className="filters">
            <button className={selectedFilter === 0 ? "active" : ""} onClick={() => filter(null)}>Toutes</button>
            <button className={selectedFilter === 1 ? "active" : ""} onClick={() => filter(false)}>A faire</button>
            <button className={selectedFilter === 2 ? "active" : ""} onClick={() => filter(true)}>Terminées</button>
        </div>
    )
}