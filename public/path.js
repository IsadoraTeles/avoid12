

class Path {
    constructor() {
        // A path has a radius, i.e how far is it ok for the vehicle to wander off
        this.radius = 10;
        // A Path is an array of points (p5.Vector objects)
        this.points = [];
    }

    // Add a point to the path
    addPoint(x, y) {
        let point = createVector(x, y);
        this.points.push(point);
    }

    getStart() {
        return this.points[0];
    }

    getEnd() {
        return this.points[this.points.length - 1];
    }

    // Draw the path
    display(alphaPath) {
        // Draw thin line for center of path
        stroke(255, alphaPath);
        strokeWeight(1);
        noFill();
        beginShape();
        for (let i = 0; i < this.points.length; i++) {
            curveVertex(this.points[i].x, this.points[i].y);
        }
        endShape();
    }

}