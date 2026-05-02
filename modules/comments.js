export const comments = [];

export const updateComments = (newComments) => {
    comments.length = 0;
    const formattedComments = newComments.map((comment) => ({
        ...comment,
        isLiked: false,
    }));
    comments.push(...formattedComments);
};
