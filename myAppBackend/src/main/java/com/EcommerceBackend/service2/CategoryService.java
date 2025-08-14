package com.EcommerceBackend.service2;


import com.EcommerceBackend.dto.CategoryDto;
import com.EcommerceBackend.dto.CategoryTypeDto;
import com.EcommerceBackend.entities.Category;
import com.EcommerceBackend.entities.CategoryType;
import com.EcommerceBackend.exceptions.ResourceNotFoundException;
import com.EcommerceBackend.repositories2.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;



    public CategoryDto createCategory(CategoryDto categoryDto){
        Category category= modelMapper.map(categoryDto,Category.class);
        if (category.getCategoryTypes() != null) {
            category.getCategoryTypes().forEach(type -> type.setCategory(category));
        }
        Category saveCategory=categoryRepository.save(category);
        return modelMapper.map(saveCategory,CategoryDto.class);
    }


    public List<CategoryDto> getAllCategory(){
        List<Category> categoryList=categoryRepository.findAll();

        return categoryList.stream().map(category ->modelMapper.map(category,CategoryDto.class) ).collect(Collectors.toList());

    }

    public CategoryDto getCategoryById(Long categoryId){
//        Category category=categoryRepository.findById(categoryId).orElse(()-> new ResourceNotFoundException("Category is not Found By this CategroyId")+categoryId.toString());

        Optional<Category> category=categoryRepository.findById(categoryId);
        return modelMapper.map(category,CategoryDto.class);

    }

    public CategoryDto updateCategory(CategoryDto categoryDto, Long categoryId) {
        // Find existing category or throw exception
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Category not found with Id " + categoryId));

        // Update basic fields if they're present in DTO
        if (categoryDto.getName() != null) {
            category.setName(categoryDto.getName());
        }
        if (categoryDto.getCode() != null) {
            category.setCode(categoryDto.getCode());
        }
        if (categoryDto.getDescription() != null) {
            category.setDescription(categoryDto.getDescription());
        }

        // Handle category types updates
        if (categoryDto.getCategoryTypes() != null) {
            List<CategoryType> existingCategoryTypes = category.getCategoryTypes();
            List<CategoryType> updatedCategoryTypes = new ArrayList<>();

            for (CategoryTypeDto categoryTypeDto : categoryDto.getCategoryTypes()) {
                if (categoryTypeDto.getId() != null) {
                    // Update existing category type
                    CategoryType existingType = existingCategoryTypes.stream()
                            .filter(t -> t.getId().equals(categoryTypeDto.getId()))
                            .findFirst()
                            .orElseThrow(() -> new ResourceNotFoundException(
                                    "CategoryType not found with Id " + categoryTypeDto.getId()));

                    modelMapper.map(categoryTypeDto, existingType); // Update fields automatically
                    updatedCategoryTypes.add(existingType);
                } else {
                    // Create new category type
                    CategoryType newCategoryType = modelMapper.map(categoryTypeDto, CategoryType.class);
                    newCategoryType.setCategory(category);
                    updatedCategoryTypes.add(newCategoryType);
                }
            }
            category.setCategoryTypes(updatedCategoryTypes);
        }

        // Save the updated category
        Category updatedCategory = categoryRepository.save(category);

        // Convert the updated Category entity to CategoryDto using ModelMapper
        return modelMapper.map(updatedCategory, CategoryDto.class);
    }




    public  void deleteCategoryById(Long categoryId){
        categoryRepository.deleteById(categoryId);

    }



}
