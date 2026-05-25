//src/utils/examPageUtils/buildExamProgressPoints.js
const getLeft = ({ questionNumber, total }) => {
    if (total === 1) {
        return 0;
    }

    return ((questionNumber - 1) / (total - 1)) * 100;
};

export const buildExamProgressPoints = ({ total, currentQuestionNumber }) => {
    const fillPercent = total === 1
        ? 100
        : getLeft({
            questionNumber: currentQuestionNumber,
            total
        });

    const middlePoint = Math.max(1, Math.round(total * 0.48));

    const laterPoint = Math.min(
        total,
        Math.max(middlePoint + 1, Math.round(total * 0.72))
    );

    const points = [
        {
            label: "Start",
            question: 1,
            left: 0
        },
        {
            label: `${middlePoint}/${total}`,
            question: middlePoint,
            left: getLeft({
                questionNumber: middlePoint,
                total
            })
        },
        {
            label: `${laterPoint}/${total}`,
            question: laterPoint,
            left: getLeft({
                questionNumber: laterPoint,
                total
            })
        },
        {
            label: `${total}/${total}`,
            question: total,
            left: 100,
            isFlag: true
        }
    ];

    return {
        fillPercent,
        points
    };
};