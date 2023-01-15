import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3000;
app.use(express.json());

type Vehicle = {
  model: string;
  color: string;
  year: number;
  power: number;
};

interface Car extends Vehicle {
  bodyType: string;
  wheelCount: number;
};

interface Boat extends Vehicle {
  draft: string;
};

interface Plane extends Vehicle {
  wingspan: number;
};

const vehicles: Vehicle[] = [];

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.post("/vehicle/add", (req: Request, res: Response) => {
  const request = req.body;
  let vehicle: Vehicle;

  if("bodyType" in request && "wheelCount" in request) {
    vehicle = { ...request } as Car;
  } else if("draft" in request) {
    vehicle = { ...request } as Boat;
  } else if("wingspan" in request) {
    vehicle = { ...request } as Plane;
  } else {
    vehicle = { ...request };
  }

  vehicles.push(vehicle);
  res.status(201).send("Vehicle added");
});

app.get("/vehicle/search/:model", (req: Request, res: Response) => {
  const model: string = req.params.model;
  const foundVehicle = vehicles.find(vehicle => vehicle.model === model);
  if (foundVehicle) {
      res.send({ model: foundVehicle.model, color: foundVehicle.color, year: foundVehicle.year, power: foundVehicle.power });
  } else {
      res.status(404).send("Vehicle not found");
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
