package com.EcommerceBackend.service2;


import com.EcommerceBackend.dto.ProductDto;
import com.EcommerceBackend.dto.ProductResourceDto;
import com.EcommerceBackend.dto.ProductVariantDto;
import com.EcommerceBackend.entities.*;
import com.example.demo4.SecurityApp.entities.*;
import com.EcommerceBackend.exceptions.ResourceNotFoundException;
import com.EcommerceBackend.repositories2.CategoryRepository;
import com.EcommerceBackend.repositories2.CategoryTypeRepository;
import com.EcommerceBackend.repositories2.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryTypeRepository categoryTypeRepository;
    private final ModelMapper modelMapper;



//    public ProductDto createProduct(ProductDto productDto) {
//        // Convert ProductDto to Product entity
//        Product product = modelMapper.map(productDto, Product.class);
//
//        // Set Category
//        Category category = categoryRepository.findById(productDto.getCategoryId())
//                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + productDto.getCategoryId()));
//        product.setCategory(category);
//
//        // Set Category Type (Optional)
//        if (productDto.getCategoryTypeId() != null) {
//            CategoryType categoryType = categoryTypeRepository.findById(productDto.getCategoryTypeId())
//                    .orElseThrow(() -> new ResourceNotFoundException("Category Type not found with ID: " + productDto.getCategoryTypeId()));
//            product.setCategoryType(categoryType);
//        }
//
//        // Handle Product Variants
//        if (productDto.getVariants() != null) {
//            List<ProductVariant> variants = productDto.getVariants().stream()
//                    .map(variantDto -> {
//                        ProductVariant variant = modelMapper.map(variantDto, ProductVariant.class);
//                        variant.setProduct(product);
//                        return variant;
//                    })
//                    .collect(Collectors.toList());
//            product.setProductVariants(variants); // Ensure this matches the field name in your Product entity
//        }
//
//        // Handle Product Resources
//        if (productDto.getProductResources() != null) {
//            List<ProductResource> resources = productDto.getProductResources().stream()
//                    .map(resourceDto -> {
//                        ProductResource resource = modelMapper.map(resourceDto, ProductResource.class);
//                        resource.setProduct(product);
//                        return resource;
//                    })
//                    .collect(Collectors.toList());
//            product.setResources(resources); // Ensure this matches the field name in your Product entity
//        }
//
//        // Save the product
//        Product savedProduct = productRepository.save(product);
//
//        // Convert back to DTO and return
//        return modelMapper.map(savedProduct, ProductDto.class);
//    }


    public ProductDto createProduct(ProductDto productDto) {
        Product product = modelMapper.map(productDto, Product.class);

        Category category = categoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + productDto.getCategoryId()));
        product.setCategory(category);

        if (productDto.getCategoryTypeId() != null) {
            CategoryType categoryType = categoryTypeRepository.findById(productDto.getCategoryTypeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category Type not found with ID: " + productDto.getCategoryTypeId()));
            product.setCategoryType(categoryType);
        }

        if (productDto.getVariants() != null) {
            List<ProductVariant> variants = productDto.getVariants().stream()
                    .map(variantDto -> {
                        ProductVariant variant = modelMapper.map(variantDto, ProductVariant.class);
                        variant.setProduct(product);
                        return variant;
                    })
                    .collect(Collectors.toList());
            product.setProductVariants(variants);
        }

        if (productDto.getProductResources() != null) {
            List<ProductResource> resources = productDto.getProductResources().stream()
                    .map(resourceDto -> {
                        ProductResource resource = modelMapper.map(resourceDto, ProductResource.class);
                        resource.setProduct(product);
                        return resource;
                    })
                    .collect(Collectors.toList());
            product.setResources(resources);
        }

        Product savedProduct = productRepository.save(product);

        // ✅ Manually map back to DTO to include thumbnail and names
        return ProductDto.builder()
                .id(savedProduct.getId())
                .name(savedProduct.getName())
                .description(savedProduct.getDescription())
                .price(savedProduct.getPrice())
                .brand(savedProduct.getBrand())
                .isNewArrival(savedProduct.isNewArrival())
                .rating(savedProduct.getRating())
                .thumbnail(savedProduct.getThumbnail())  // ✅ Make sure it's set correctly
                .slug(savedProduct.getSlug())
                .categoryId(savedProduct.getCategory().getId())
                .categoryName(savedProduct.getCategory().getName()) // ✅ Add category name
                .categoryTypeId(savedProduct.getCategoryType().getId())
                .categoryTypeName(savedProduct.getCategoryType().getName()) // ✅ Add category type name
                .variants(savedProduct.getProductVariants()
                        .stream()
                        .map(variant -> modelMapper.map(variant, ProductVariantDto.class))
                        .collect(Collectors.toList()))
                .productResources(savedProduct.getResources()
                        .stream()
                        .map(res -> modelMapper.map(res, ProductResourceDto.class))
                        .collect(Collectors.toList()))
                .build();
    }




    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(product -> {
                    ProductDto dto = modelMapper.map(product, ProductDto.class);

                    // Set the thumbnail manually from primary product resource
                    product.getResources().stream()
                            .filter(ProductResource::getIsPrimary)
                            .findFirst()
                            .ifPresent(primaryResource -> dto.setThumbnail(primaryResource.getUrl()));

                    return dto;
                })
                .collect(Collectors.toList());
    }



public ProductDto getProductById(Long productId) {
    // Fetch the product by ID, throw exception if not found
    Product product = productRepository.findById(productId)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found by this ID: " + productId));

    // Map Product entity to ProductDto using ModelMapper
    ProductDto productDto = modelMapper.map(product, ProductDto.class);

    // Safely handle null productResources
    List<ProductResource> resources = product.getResources();
    if (resources != null) {
        resources.stream()
                .filter(ProductResource::getIsPrimary)
                .findFirst()
                .ifPresent(primary -> productDto.setThumbnail(primary.getUrl())); // Set the thumbnail if a primary resource exists
    }

    return productDto; // Return the mapped ProductDto
}



    public ProductDto updateProductById(Long productId, ProductDto productDto) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found by this ID: " + productId));

        // Use ModelMapper to map non-null fields from DTO to the existing product
        modelMapper.map(productDto, product);

        Product updatedProduct = productRepository.save(product);

        ProductDto updatedDto = modelMapper.map(updatedProduct, ProductDto.class);

        // Set thumbnail manually if needed
        List<ProductResource> resources = updatedProduct.getResources();
        if (resources != null) {
            resources.stream()
                    .filter(ProductResource::getIsPrimary)
                    .findFirst()
                    .ifPresent(primary -> updatedDto.setThumbnail(primary.getUrl()));
        }

        return updatedDto;
    }




    public List<ProductDto> getProductAllByCategory(String categoryName) {
        List<Product> products = productRepository.findAllByCategoryNameIgnoreCase(categoryName);

        return products.stream()
                .map(product -> modelMapper.map(product, ProductDto.class))
                .collect(Collectors.toList());
    }






}
