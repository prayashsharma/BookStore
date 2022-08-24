using BookStoreApi.Entities;

namespace BookStoreApi.Services.Interfaces;

public interface ICategoryService
{
    Task<List<Category>> GetAsync();

    Task<Category?> GetAsync(string id);

    Task CreateAsync(Category newBook);

    Task UpdateAsync(string id, Category updatedBook);

    Task RemoveAsync(string id);
}