
using BookStoreApi.Models;
using BookStoreApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly CategoriesService _categoriesService;

    public CategoriesController(CategoriesService categoriesService) =>
        _categoriesService = categoriesService;

    [HttpGet]
    public async Task<List<Category>> Get() =>
        await _categoriesService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Category>> Get(string id)
    {
        var book = await _categoriesService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        return book;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Category newCategory)
    {
        await _categoriesService.CreateAsync(newCategory);

        return CreatedAtAction(nameof(Get), new { id = newCategory.Id }, newCategory);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Category updatedCategory)
    {
        var book = await _categoriesService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        updatedCategory.Id = book.Id;

        await _categoriesService.UpdateAsync(id, updatedCategory);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var book = await _categoriesService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        await _categoriesService.RemoveAsync(id);

        return NoContent();
    }
}