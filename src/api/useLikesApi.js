const useLikesApi = () => {
    const like = async (id) => {
        return fetch(`http://seonhm.kr/posts/${id}/likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });
    };

    const unlike = async (id) => {
        return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/likes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });
    };

    return {
        like,
        unlike,
    };
}

export default useLikesApi;