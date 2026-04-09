import { useState } from "react";

type FiltersProps = {
    onFilter: (done: string) => void
}

export const Filters = ({ onFilter }: FiltersProps) => {

    const [selectedFilter, setSelectedFilter] = useState<string>('all');

    const filter = (done: 'all' | 'todo' | 'done' | 'mine') => {
        onFilter(done);
        setSelectedFilter(done)
    }

    return (
        <div className="filters">
            <button className={selectedFilter === 'all' ? "active" : ""} onClick={() => filter('all')}>Toutes</button>
            <button className={selectedFilter === 'todo' ? "active" : ""} onClick={() => filter('todo')}>A faire</button>
            <button className={selectedFilter === 'done' ? "active" : ""} onClick={() => filter('done')}>Terminées</button>

            
            <button className={selectedFilter === 'mine' ? "active" : ""} onClick={() => filter('mine')}>Mes tâches</button>
        </div>
    )
}