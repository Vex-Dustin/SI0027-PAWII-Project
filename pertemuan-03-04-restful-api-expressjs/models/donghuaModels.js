let donghua = [
    { id: 1, judul: "Soul Land", rilis: "2018", episode: 260, genre: "Action, Fantasy" },
    { id: 2, judul: "Battle Through the Heavens", rilis: "2017", episode: 104, genre: "Action, Adventure" },
    { id: 3, judul: "Perfect World", rilis: "2021", episode: 150, genre: "Action, Cultivation" },
    { id: 4, judul: "Swallowed Star", rilis: "2020", episode: 130, genre: "Action, Sci-Fi" },
];

function getAllDonghua() {
    return donghua;
}

function getDonghuaById(id) {
    return donghua.find((m) => m.id === id);
}

function createDonghua(data) {
    const newDonghua = {
        id: donghua.length > 0 ? donghua[donghua.length - 1].id + 1 : 1,
        judul: data.judul,
        rilis: data.rilis,
        episode: data.episode,
        genre: data.genre,
    };
    donghua.push(newDonghua);
    return newDonghua;
}

function updateDonghua(id, updatedData) {
    const index = donghua.findIndex((m) => m.id === id);
    if (index === -1) return null;

    donghua[index] = { ...donghua[index],
        judul: updatedData.judul || donghua[index].judul,
        rilis: updatedData.rilis || donghua[index].rilis,
        episode: updatedData.episode || donghua[index].episode,
        genre: updatedData.genre || donghua[index].genre,
     };
    return donghua[index];
}

function deleteDonghua(id) {
    const index = donghua.findIndex((m) => m.id === id);
    if (index === -1) return null;
    const deletedDonghua = donghua.splice(index, 1);
    return deletedDonghua[0];
}

module.exports = {
    getAllDonghua,
    getDonghuaById,
    createDonghua,
    updateDonghua,
    deleteDonghua,
};