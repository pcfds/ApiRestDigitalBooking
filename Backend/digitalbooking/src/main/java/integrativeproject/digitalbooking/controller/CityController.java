package integrativeproject.digitalbooking.controller;

import integrativeproject.digitalbooking.service.impl.CityService;
import integrativeproject.digitalbooking.model.dto.CityDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/cities")

public class CityController {
    @Autowired
    CityService cityService;

    @PostMapping("/create")
    public ResponseEntity<?> addCity(@RequestBody CityDTO cityDTO){
        cityService.create(cityDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCity(@PathVariable ("id") Integer id,@RequestBody CityDTO cityDTO){
        cityService.update(cityDTO);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }
    @GetMapping("/findAll")
    public ResponseEntity<?> findcities(){
        return ResponseEntity.ok(cityService.findAll());
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findCitiesbyId(@PathVariable("id")Integer id){
       CityDTO cityDTO =  cityService.findById(id);
        return ResponseEntity.ok(cityDTO);
    }

    @GetMapping("/findByName/{name}")
    public ResponseEntity<?> findCitybyName (@RequestParam("name")String name){
        CityDTO cityDTO =  cityService.findByName(name);
        return ResponseEntity.ok(cityDTO);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCityById(@PathVariable("id") Integer id){
        cityService.deleteById(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
