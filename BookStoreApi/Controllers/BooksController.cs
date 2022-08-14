
using BookStoreApi.Models;
using BookStoreApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly BooksService _booksService;
    private readonly CategoriesService _categoriesService;
    private readonly ILogger<BooksController> _logger;

    public BooksController(BooksService booksService, CategoriesService categoriesService, ILogger<BooksController> logger)
    {
        _booksService = booksService;
        _categoriesService = categoriesService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<List<Book>> Get()
    {
        return await _booksService.GetAsync();
    }


    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Book>> Get(string id)
    {
        var book = await _booksService.GetAsync(id);

        if (book is null)
            return NotFound();

        return book;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Book newBook)
    {
        if (newBook.Category == null || newBook.Category?.Id == null)
            return BadRequest();

        (bool isCategoryValid, Category? category) = await IsCategoryValid(newBook.Category);
        if (!isCategoryValid)
            return BadRequest();

        if (category?.CategoryName != null)
            newBook.Category.CategoryName = category.CategoryName;

        await _booksService.CreateAsync(newBook);

        return CreatedAtAction(nameof(Get), new { id = newBook.Id }, newBook);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Book updatedBook)
    {
        var book = await _booksService.GetAsync(id);

        if (book is null)
            return NotFound();

        (bool isCategoryValid, Category? category) = await IsCategoryValid(updatedBook.Category);

        if (!isCategoryValid)
            return BadRequest();

        if (category?.CategoryName != null)
            updatedBook.Category.CategoryName = category.CategoryName;

        updatedBook.Id = book.Id;

        await _booksService.UpdateAsync(id, updatedBook);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var book = await _booksService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        await _booksService.RemoveAsync(id);

        return NoContent();
    }

    private async Task<(bool, Category?)> IsCategoryValid(Category category)
    {
        if (category == null || category?.Id == null)
            return (false, null);

        var validCategory = await this._categoriesService.GetAsync(category.Id);

        if (validCategory == null)
            return (false, null); ;

        return (true, validCategory);
    }
}