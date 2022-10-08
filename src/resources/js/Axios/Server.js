

const storeItem = (e) => {
    e.preventDefault();
    Inertia.post(route('attribute.store'),data);
};