// @ts-check

// make this a bookmark with https://chriszarate.github.io/bookmarkleter/

if (document.querySelector("div.student-gb-grades-main")) {
    // TODO: weighted grades

    /**
     * @type {{ earned: number, possible: number }[]}
     */
    const grades = [];

    const get_letter = (/** @type {number} */ percent) => {
        if (percent >= 90) {
            return "A";
        } else if (percent >= 80) {
            return "B";
        } else if (percent >= 70) {
            return "C";
        } else if (percent >= 60) {
            return "D";
        } else {
            return "F";
        }
    };

    const recalc = () => {
        let earned = 0;
        let possible = 0;

        const nonneg = (/** @type {number} */ n) => (n < 0 ? 0 : n);

        for (const grade of grades) {
            earned += nonneg(grade.earned);
            possible += nonneg(grade.possible);
        }

        const percent = Math.round((earned / possible) * 100);

        console.log(earned, possible, `${percent}% ${get_letter(percent)}`);

        // @ts-expect-error
        document.querySelector(
            "div.gradebook-grid-title.wide"
        ).textContent = `Current Grade in Class: ${percent}% ${get_letter(
            percent
        )}`;
    };

    const cells = Array.from(
        document.querySelectorAll(
            "table.grades-grid > tbody > tr > td.primary-grade-cell"
        )
    );

    for (const cell of cells) {
        /**
         * @type {HTMLSpanElement | null}
         */
        const points_earned = cell.querySelector(
            "span.data-field-points_earned"
        );
        /**
         * @type {HTMLSpanElement | null}
         */
        const points_possible = cell.querySelector(
            "span.data-field-points_possible"
        );

        if (
            !points_earned ||
            !points_possible ||
            !points_earned.textContent ||
            !points_possible.textContent
        ) {
            continue;
        }

        const parse_earned = (
            /** @type {string} */ content,
            /** @type {number} */ possible
        ) => {
            if (content === "X") {
                return possible;
            }

            const earned = parseFloat(content);

            if (isNaN(earned)) {
                return 0;
            } else {
                return earned;
            }
        };

        const possible = parseFloat(points_possible.textContent);
        const earned = parse_earned(points_earned.textContent, possible);

        const index = grades.push({
            earned,
            possible
        });

        const points_earned_input = document.createElement("input");
        points_earned_input.type = "number";
        points_earned_input.value = earned.toString();
        points_earned_input.style.display = "block";

        points_earned.replaceWith(points_earned_input);

        points_earned_input.addEventListener("change", () => {
            grades[index - 1].earned = parse_earned(
                points_earned_input.value,
                possible
            );
            recalc();
        });
    }

    recalc();
} else if (
    document.querySelector("div.communication-container > div.communication")
) {
    // const menu = document.querySelector("div.communication > div.communication-menu");
    // const new_convo = document.createElement("div");
    // new_convo.classList.add("communication-left-option");
    // new_convo.dataset["tab"] = "New Conversation";
    // new_convo.textContent = "New Conversation";
    // new_convo.addEventListener("click", () => {
    //     for (const sibling of new_convo.parentElement?.children || []) {
    //         sibling.classList.remove("active-tab");
    //     }
    //     new_convo.classList.add("active-tab");
    // });
    // menu.appendChild(new_convo);
    // TODO: new conversation?
} else {
    alert("ReFocused is not supported on this page.");
}
