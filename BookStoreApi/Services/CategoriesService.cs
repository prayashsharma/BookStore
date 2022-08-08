using BookStoreApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BookStoreApi.Services;

public class CategoriesService
{
    private readonly IMongoCollection<Category> _categoriesCollection;

    public CategoriesService(
        IOptions<BookStoreDatabaseSettings> bookStoreDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            bookStoreDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            bookStoreDatabaseSettings.Value.DatabaseName);

        _categoriesCollection = mongoDatabase.GetCollection<Category>(
            bookStoreDatabaseSettings.Value.CategoriesCollectionName);
    }

    public async Task<List<Category>> GetAsync() =>
        await _categoriesCollection.Find(_ => true).ToListAsync();

    public async Task<Category?> GetAsync(string id) =>
        await _categoriesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Category newBook) =>
        await _categoriesCollection.InsertOneAsync(newBook);

    public async Task UpdateAsync(string id, Category updatedBook) =>
        await _categoriesCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

    public async Task RemoveAsync(string id) =>
        await _categoriesCollection.DeleteOneAsync(x => x.Id == id);
}