using BookStoreApi.Entities;

namespace BookStoreApi.Services.Interfaces;

public interface IBookService
{
    Task<List<Book>> GetAsync();
    Task<Book?> GetAsync(string id);
    Task CreateAsync(Book newBook);
    Task UpdateAsync(string id, Book updatedBook);
    Task RemoveAsync(string id);
}