export default class FlightModel {
    constructor(parseFlight){
        this.city = parseFlight.get("city");
        this.cityId = parseFlight.get("cityId");
        this.country = parseFlight.get("country");
        this.departureDate = parseFlight.get("departureDate");
        this.returnDate = parseFlight.get("returnDate");
        this.sourcePlace = parseFlight.get("sourcePlace");
        this.cost = parseFlight.get("cost");
        this.direct = parseFlight.get("direct");
        this.carriers = parseFlight.get("carriers");
    }
}