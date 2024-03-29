import "./my_input.css";
import { useRef } from "react";
import { Howl } from "howler";
import uiClick from "../assets/ui-click.wav";

type inputTypes = {
    type?: string,
    placeholder?: string,
    value?: string,
    hide: boolean,
    onKeyDown?: (value: string, event: React.KeyboardEvent<HTMLInputElement>) => void,
    onReset?: () => void
};

export default function MyInput({ type = "text", placeholder, value, onKeyDown, onReset, hide }: inputTypes) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && onKeyDown) {
            const currentValue = inputRef.current?.value as string;
            if (currentValue) onKeyDown(currentValue, event);
        }
    };

    const handleClick = () => {
        if (inputRef.current && onReset) {
            inputRef.current.value = "";
            sound.play();
            onReset();
        }
    }

    const sound = new Howl({
        src: [uiClick],
        loop: false,
        volume: 0.5,
    });

    return (
        <div className="my_input">
            <input
                value={value}
                ref={inputRef}
                type={type}
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
            />
            {!hide && <p className="clear" onClick={handleClick}>X</p>}
        </div>
    );
}
