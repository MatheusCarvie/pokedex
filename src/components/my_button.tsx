import "./my_button.css";

type buttonTypes = {
    text: string,
    onClick: () => void
}

export default function MyButton({ text, onClick }: buttonTypes) {
    return (
        <button className="my_button" onClick={onClick}>{text}</button>
    )
}