type FiltersProps = {
    onFilter: (done?: boolean) => void
}

export const Filters = ({ onFilter }: FiltersProps) => {

    return (
        <>
            <button onClick={() => onFilter()}>Toutes</button>
            <button onClick={() => onFilter(false)}>A faire</button>
            <button onClick={() => onFilter(true)}>Terminées</button>
        </>
    )
}