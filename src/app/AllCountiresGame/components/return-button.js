"use client";

import styles from "../page.module.css";
import { useRouter } from "next/navigation";

function ReturnButton({ href, text = "Return", data }) {
    const router = useRouter();

    function handleClick() {
        href ? router.push(href) : window.location.reload();
    }

    return (
        <button 
            className={styles.nextQuestionButton}
            onClick={handleClick}
        >
            {text}
        </button>
    );
}

export default ReturnButton;