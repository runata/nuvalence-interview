export default class Rectangle {
    // Top-left and bottom-right coordinates
    constructor(x1, y1, x2, y2) {
        this.x1 = Math.round(x1)
        this.y1 = Math.round(y1)
        this.x2 = Math.round(x2)
        this.y2 = Math.round(y2)
    }

    // This function is ugly and disgusting, but I couldn't figure out how to normalize rectangles properly
    intersect(other) {
        const x1 = Math.max(this.x1, other.x1)
        const y1 = Math.max(this.y1, other.y1)
        const x2 = Math.min(this.x2, other.x2)
        const y2 = Math.min(this.y2, other.y2)
        if (x1 > x2 || y1 > y2 || this.contains(other) || this.adjacent(other)) {
            return false
        } else {
            if ((this.x1 > other.x1 && this.y1 > other.y1 && this.x2 > other.x2 && this.y2 < other.y2) 
                || (this.x1 < other.x1 && this.y1 < other.y1 && this.x2 < other.x2 && this.y2 > other.y2)) {
                return [{x: x2, y: y1}, {x: x2, y: y2}]
            } else if ((this.x1 < other.x1 && this.y1 > other.y1 && this.x2 < other.x2 && this.y2 < other.y2)
                || (this.x1 > other.x1 && this.y1 < other.y1 && this.y2 > other.y2 && this.x2 > other.x2)) {
                return [{x: x1, y: y1}, {x: x1, y: y2}]
            } else if ((this.x1 < other.x1 && this.y1 > other.y1 && this.x2 > other.x2 && this.y2 > other.y2)
                || (this.x1 > other.x1 && this.y1 < other.y1 && this.x2 < other.x2 && this.y2 < other.y2)) {
                return [{x: x1, y: y1}, {x: x2, y: y1}]
            } else if ((this.x1 > other.x1 && this.y1 > other.y1 && this.x2 < other.x2 && this.y2 > other.y2)
                || (this.x1 < other.x1 && this.y1 < other.y1 && this.x2 > other.x2 && this.y2 < other.y2)) {
                return [{x: x1, y: y2}, {x: x2, y: y2}]
            } else if ((this.x1 > other.x1 && this.y1 < other.y1 && this.x2 > other.x2 && this.y2 < other.y2) 
                || (this.x1 < other.x1 && this.y1 > other.y1 && this.x2 < other.x2 && this.y2 > other.y2)) {
                return [{x: x1, y: y1}, {x: x2, y: y2}]
            } else if ((this.x1 > other.x1 && this.y1 > other.y1 && this.x2 > other.x2 && this.y2 > other.y2) 
                || (this.x1 < other.x1 && this.y1 < other.y1 && this.y2 < other.y2 && this.x2 < other.x2)) {
                return [{x: x2, y: y1}, {x: x1, y: y2}]
            } else {
                return [{x: x1, y: y1}, {x: x2, y: y1}, {x: x2, y: y2}, {x: x1, y: y2}]
            }
        }
    }

    contains(other) {
        return this.x1 <= other.x1 && this.y1 <= other.y1 && this.x2 >= other.x2 && this.y2 >= other.y2
    }

    adjacent(other) {
        if (this.x1 === other.x2 || this.x2 === other.x1 || this.y1 === other.y2 || this.y2 === other.y1) {
            if (((this.x2 === other.x1 || this.x1 === other.x2) && (this.y1 === other.y1 && this.y2 === other.y2)) 
                || ((this.y2 === other.y1 || this.y1 === other.y2) && (this.x1 === other.x1 && this.x2 === other.x2))) {
                return 'properly'
            } else if (((this.x2 === other.x1 || this.x1 === other.x2) && (this.y1 < other.y1 && this.y2 > other.y2)) 
                || ((this.y2 === other.y1 || this.y1 === other.y2) && (this.x1 < other.x1 && this.x2 > other.x2))) {
                return 'sub-line'
            } else {
                return 'partially'
            }
        } else {
            return false
        }
    }
}