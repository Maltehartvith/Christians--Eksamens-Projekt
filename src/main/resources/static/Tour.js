class Tour{
    constructor() {
        this.id;
        this.name;
        this.description;
        this.maxMembers;
        this.duration;
        this.attractions = [];
    }
    constructor(id, name, description, maxMembers, duration) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.maxMembers = maxMembers;
        this.duration = duration;
        this.attractions = [];
    }
}