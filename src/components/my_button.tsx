import "./my_button.css";
import uiClick from "../assets/ui-click.wav";
import { Howl } from "howler";

type buttonTypes = {
    text: string,
    onClick: () => void
}

export default function MyButton({ text, onClick }: buttonTypes) {
    const sound = new Howl({
        src: [uiClick],
        loop: false,
        volume: 0.5,
    });

    return (
        <button className="my_button" onClick={() => {
            sound.play();
            onClick();
        }}>{text}</button>
    )
}