import instance from "./axios";

export const userRegister = (user) => {
    return instance.post("/users", user);
};

export const updateUser = (user) => {
    return instance.put(`/users/${user.id}`, user);
};

export const getAllCities = () => {
    return instance.get("/city");
};

export const login = (user) => {
    return instance.post("/users/login", user);
};

export const confirm = (code, id) => {
    return instance.post("/users/confirm", {
        code,
        id
    });
};

export const createAdvert = (data) => {
    return instance.post("/advert/create", data);
};

export const getAdvertsOnMyCity = (id) => {
    return instance.get(`/users/${id}/adverts`);
};

export const getMyAdverts = (id) => {
    return instance.get(`advert/${id}/?isActive=true`);
};

export const advertApplication = (advertId, userId) => {
    return instance.post(`advert/application`, {
        advertId,
        userId
    });
};

export const createConversation = (id, receiver, advertId) => {
    return instance.post(`/message/create`, {
        receiver,
        sender: id,
        advert: advertId
    });
};

export const getAllChats = (id) => {
    return instance.get(`/message/${id}`);
};

export const checkChatIsExist = (id) => {
    return instance.get(`/message/check/${id}`);
};

export const getLoggedUser = (id) => {
    return instance.get(`/users/${id}`);
};


export const assignUser = (advertId, userId) => {
    return instance.post(`/advert/assign`, {
        advertId,
        userId
    });
};

export const getAdvert = (advertId) => {
    return instance.get(`/advert/single/${advertId}`);
};


export const doneAdvert = (advert) => {
    return instance.post(`/advert/done`, {
        advertId: advert._id,
        userId: advert.assignedUser._id
    });
};

export const getMyDoneAdverts = (id) => {
    return instance.get(`/advert/done/${id}`);
};
