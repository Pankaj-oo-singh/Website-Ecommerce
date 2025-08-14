package com.EcommerceBackend.Controllers2;


import com.EcommerceBackend.dto.ProductDto;
import com.EcommerceBackend.service2.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ProductController {

    private final ProductService productService;


    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto){
        ProductDto productDto1=productService.createProduct(productDto);
        return new ResponseEntity<>(productDto1, HttpStatus.CREATED);
    }


    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<ProductDto> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }


   @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable(value = "id",required = true) Long categoryId){
        ProductDto productDto=productService.getProductById(categoryId);
        return new ResponseEntity<>(productDto,HttpStatus.OK);
   }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto) {
        ProductDto updatedProduct = productService.updateProductById(id, productDto);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<ProductDto>> getProductsByCategory(@PathVariable String categoryName) {
        List<ProductDto> productDtos = productService.getProductAllByCategory(categoryName);
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }



}
