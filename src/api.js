import axios from "axios";

const getUsersData = async (userToSearch, page = 1) => {
    const usersData = [];

    const usernames = await axios('https://api.github.com/search/users', {
        params: {
            q: userToSearch,
            per_page: 6,
            page
        }
    }, { headers: {'Authorization': '989f8504e4064fc204f4ea2bbd5f33a12f72de49'} })
        .then(({ data }) => {
            const items = data.items.map(({ login, total_count }) => login);
            return {
                totalItems: data.total_count,
                items
            }
        });

    for (let user of usernames.items) {
        await axios(`https://api.github.com/users/${user}`).then(({ data }) => {
            if (data) {
                const { name, avatar_url, bio, email } = data;

                usersData.push({
                    name,
                    avatar_url,
                    bio,
                    email
                })
            }
        })
    }

    return {
        totalItems: usernames.totalItems,
        users: usersData
    };
}

export default getUsersData;