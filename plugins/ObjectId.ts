function ObjectId(m = Math, d = Date, h = 16, s = (s:any) => m.floor(s).toString(h)){
    let id = s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

    return id;
};

export default ObjectId;