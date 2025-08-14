package com.EcommerceBackend.Controllers2;


import com.EcommerceBackend.dto.CategoryDto;
import com.EcommerceBackend.service2.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CategoryController {



    private final CategoryService categoryService;



    @PostMapping
    public ResponseEntity<CategoryDto>  createCategory(@RequestBody CategoryDto categoryDto ){
       CategoryDto categoryDto1= categoryService.createCategory(categoryDto);
       return new ResponseEntity<>(categoryDto1, HttpStatus.CREATED);
    }

    @GetMapping("/getAllCategory")
    public  ResponseEntity<List<CategoryDto>> getAllCategory(){
        List<CategoryDto> categoryDto=categoryService.getAllCategory();

        return new ResponseEntity<>(categoryDto,HttpStatus.OK);

    }
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable(value = "id",required = true) Long categoryId){
        CategoryDto categoryDto=categoryService.getCategoryById(categoryId);
        return new ResponseEntity<>(categoryDto,HttpStatus.OK);

    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDto> updateCategory(@RequestBody CategoryDto categoryDto,@PathVariable(value = "id",required = true) Long categoryId){
        CategoryDto categoryDto1=categoryService.updateCategory(categoryDto,categoryId);
        return new ResponseEntity<>(categoryDto1,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoryById(@PathVariable(value = "id",required = true) Long categoryId){
       categoryService.deleteCategoryById(categoryId);
      return ResponseEntity.ok().build();

    }



}
