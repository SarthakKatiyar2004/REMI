interface CardActionsProps {
    onEdit: () => void;
    onDelete: () => void;
}

function CardActions({
    onEdit,
    onDelete,
}: CardActionsProps) {

    function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this item?"
        );

        if (confirmed) {
            onDelete();
        }
    }

    return (
        <div>

            <button onClick={onEdit}>
                Edit
            </button>

            <button onClick={handleDelete}>
                Delete
            </button>

        </div>
    );
}

export default CardActions;