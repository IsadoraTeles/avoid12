
class Vehicle {
    constructor(x, y, ms, mf) {

        this.position = createVector(x, y);
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, 0);
        this.radius = 6;
        this.maxspeed = ms || 1;
        this.maxforce = mf || 0.01;
        this.c = [random(0, 255), 255, 255, 255];

        this.history = [];
    }

    run() {
        this.update();
        this.borders();
        this.display();
    }

    // Implementing Reynolds' flow field following algorithm
    // http://www.red3d.com/cwr/steer/FlowFollow.html
    follow(force) {
        // What is the vector at that spot in the flow field?
        let desired = force;
        // Scale it up by maxspeed
        desired.normalize();
        desired.mult(this.maxspeed);
        // Steering is desired minus velocity
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce); // Limit to maximum steering force
        this.applyForce(steer);
    }

    followPath(pathh) {

        // Predict position 25 (arbitrary choice) frames ahead


        //print(pathh.points.length);

        let predict = this.velocity.copy();
        predict.normalize();
        predict.mult(25);
        let predictpos = p5.Vector.add(this.position, predict);
        //print(predictpos);

        // Now we must find the normal to the path from the predicted position
        // We look at the normal for each line segment and pick out the closest one
        let normal = null;
        let target = null;
        let worldRecord = 1000000; // Start with a very high worldRecord distance that can easily be beaten

        // Loop through all points of the path
        for (let i = 0; i < pathh.points.length; i++) {

            // Look at a line segment
            let a = pathh.points[i];
            let b = pathh.points[(i + 1) % pathh.points.length]; // Note Path has to wraparound

            // Get the normal point to that line
            // let normalPoint = getNP(predictpos, a, b);
            let ap = p5.Vector.sub(predictpos, a);
            let ab = p5.Vector.sub(b, a);
            ab.normalize(); // Normalize the line
            // Project vector "diff" onto line by using the dot product
            ab.mult(ap.dot(ab));
            let normalPoint = p5.Vector.add(a, ab);

            // Check if normal is on line segment
            let dir = p5.Vector.sub(b, a);
            // If it's not within the line segment, consider the normal to just be the end of the line segment (point b)
            //if (da + db > line.mag()+1) {
            if (normalPoint.x < min(a.x, b.x) || normalPoint.x > max(a.x, b.x) || normalPoint.y < min(a.y, b.y) || normalPoint.y > max(a.y, b.y)) {
                normalPoint = b.copy();
                // If we're at the end we really want the next line segment for looking ahead
                a = pathh.points[(i + 1) % pathh.points.length];
                b = pathh.points[(i + 2) % pathh.points.length]; // Path wraps around
                dir = p5.Vector.sub(b, a);
            }

            // How far away are we from the path?
            let d = p5.Vector.dist(predictpos, normalPoint);
            // Did we beat the worldRecord and find the closest line segment?
            if (d < worldRecord) {
                worldRecord = d;
                normal = normalPoint;

                // Look at the direction of the line segment so we can seek a little bit ahead of the normal
                dir.normalize();
                // This is an oversimplification
                // Should be based on distance to path & velocity
                dir.mult(25);
                target = normal.copy();
                target.add(dir);
            }
        }

        // Draw the debugging stuff
        if (debug) {
            // Draw predicted future position
            stroke(0);
            fill(0);
            line(this.position.x, this.position.y, predictpos.x, predictpos.y);
            ellipse(predictpos.x, predictpos.y, 4, 4);

            // Draw normal position
            stroke(0);
            fill(0);
            ellipse(normal.x, normal.y, 4, 4);
            // Draw actual target (red if steering towards it)
            line(predictpos.x, predictpos.y, target.x, target.y);
            if (worldRecord > pathh.radius) fill(255, 0, 0);
            noStroke();
            ellipse(target.x, target.y, 8, 8);
        }

        // Only if the distance is greater than the path's radius do we bother to steer
        if (worldRecord > pathh.radius) {
            return this.seek(target);
        } else {
            return createVector(0, 0);
        }

    }

    // A method that calculates a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    seek(target) {
        let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

        // If the magnitude of desired equals 0, skip out of here
        // (We could optimize this to check if x and y are 0 to avoid mag() square root
        if (desired.mag() === 0) return;

        // Normalize desired and scale to maximum speed
        desired.normalize();
        desired.mult(this.maxspeed);
        // Steering = Desired minus velocity
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce); // Limit to maximum steering force
        this.applyForce(steer);
    }

    applyForce(force) {
        // We could add mass here if we want A = F / M
        //let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(force);
    }

    // A method that calculates a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    arrive(target) {
        let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
        let d = desired.mag();
        // Scale with arbitrary damping within 100 pixels
        if (d < 50) {
            var m = map(d, 0, 50, -1, this.maxspeed);
            desired.setMag(m);

        } else {
            desired.setMag(this.maxspeed);
        }

        // Steering = Desired minus Velocity
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);  // Limit to maximum steering force
        this.applyForce(steer);
    }

    // Separation
    // Method checks for nearby vehicles and steers away
    separate(boids, sep) {
        let desiredseparation = sep;
        let steer = createVector(0, 0);
        let count = 0;
        // For every boid in the system, check if it's too close
        for (let i = 0; i < boids.length; i++) {
            let pos = createVector(boids[i].x, boids[i].y);
            let d = p5.Vector.dist(this.position, pos);
            // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
            if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                let diff = p5.Vector.sub(this.position, pos);
                diff.normalize();
                diff.div(d); // Weight by distance
                steer.add(diff);
                count++; // Keep track of how many
            }
        }
        // Average -- divide by how many
        if (count > 0) {
            steer.div(count);
        }

        // As long as the vector is greater than 0
        if (steer.mag() > 0) {
            // Implement Reynolds: Steering = Desired - Velocity
            steer.normalize();
            steer.mult(this.maxspeed);
            steer.sub(this.velocity);
            steer.limit(this.maxforce);
        }
        return steer;
    }

    // Alignment
    // For every nearby boid in the system, calculate the average velocity
    align(boids, ali) {
        let neighbordist = ali;
        let sum = createVector(0, 0);
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let pos = createVector(boids[i].x, boids[i].y);

            let d = p5.Vector.dist(this.position, pos);
            if ((d > 0) && (d < neighbordist)) {
                sum.add(boids[i].velocity);
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(this.maxspeed);
            let steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            return steer;
        } else {
            return createVector(0, 0);
        }
    }

    // Cohesion
    // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
    cohesion(boids, coe) {
        let neighbordist = coe;
        let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let pos = createVector(boids[i].x, boids[i].y);
            let d = p5.Vector.dist(this.position, pos);
            if ((d > 0) && (d < neighbordist)) {
                sum.add(pos); // Add location
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            return this.seek(sum); // Steer towards the location
        } else {
            return createVector(0, 0);
        }
    }

    // We accumulate a new acceleration each time based on three rules
    flock(boids, separation, coco, align) {
        let sep = this.separate(boids, separation); // Separation
        let ali = this.align(boids, align); // Alignment
        let coh = this.cohesion(boids, coco); // Cohesion
        //print(coh);
        //print(ali);
        // Arbitrarily weight these forces
        sep.mult(2.5);
        ali.mult(1.0);
        // if (coh = !undefined) {
        //     coh.mult(1.0);
        // } else coh = createVector(0, 0);
        // Add the force vectors to acceleration
        this.applyForce(sep);
        this.applyForce(ali);
        this.applyForce(coh);
    }

    // Method to update location
    update(maxsp, maxfr) {

        this.maxforce = maxfr;
        this.maxspeed = maxsp;

        let v = createVector(this.position.x, this.position.y);
        this.history.push(v);

        if (this.history.length > 50) {
            this.history.splice(0, 1);
        }

        // Update velocity
        this.velocity.add(this.acceleration);
        // Limit speed
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        // Reset accelerationelertion to 0 each cycle
        this.acceleration.mult(0);
    }

    // Wraparound
    bordersPath(p) {
        if (this.position.x > p.getEnd().x + 40) {
            this.seek(p.getEnd());
        }
    }

    boundaries(w, h, dis) {

        let desired = null;
        let d = dis;

        if (this.position.x < d) {
            desired = createVector(this.maxspeed, this.velocity.y);
        } else if (this.position.x > w - d) {
            desired = createVector(-this.maxspeed, this.velocity.y);
        }

        if (this.position.y < d) {
            desired = createVector(this.velocity.x, this.maxspeed);
        } else if (this.position.y > h - d) {
            desired = createVector(this.velocity.x, -this.maxspeed);
        }

        if (desired !== null) {
            desired.normalize();
            desired.mult(6);
            let steer = p5.Vector.sub(desired, this.velocity);
            //steer.limit(this.maxforce);
            this.applyForce(steer);
        }
    }

    boundariesFlock(w, h, dis) {
        if (this.position.x < -dis) this.position.x = w + dis;
        if (this.position.y < -dis) this.position.y = h + dis;
        if (this.position.x > w + dis) this.position.x = -dis;
        if (this.position.y > h + dis) this.position.y = -dis;
    }

    display() {
        // Draw a triangle rotated in the direction of velocity
        //fill(this.c);
        //push();
        //translate(this.position.x, this.position.y);
        //rotate(theta);
        beginShape();
        for (let i = 0; i < this.history.length; i++) {
            let pos = this.history[i];
            //let col = map(i, 0, this.history.length, 0, 255);
            stroke(color(this.c));
            strokeWeight(2);
            //let d = map(i, 0, this.history.length, 1, 24);
            //ellipse(pos.x, pos.y, d, d);
            //noFill();
            vertex(pos.x, pos.y);
            endShape();
        }
        //pop();

        // ellipse(this.position.x, this.position.y, 20, 20);

    }

    eat(foodList) {
        var record = Infinity;
        var closestIndex = -1;
        for (var i = 0; i < foodList.length; i++) {

            var d = this.position.dist(foodList[i]);

            if (d < record) {
                record = d;
                closestIndex = i;
            }
        }

        this.seek(foodList[closestIndex]);

        if (record < 5 && foodList.length > 1) {
            foodList.splice(closestIndex, 1);
        }

    }
}