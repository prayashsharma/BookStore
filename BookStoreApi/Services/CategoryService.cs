using BookStoreApi.Entities;
using BookStoreApi.Services.Interfaces;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BookStoreApi.Services;

public class CategoryService : ICategoryService
{
    private readonly IMongoCollection<Category> _categoriesCollection;
    private readonly IMongoCollection<Book> _booksCollection;

    public CategoryService(
        IOptions<BookStoreDatabaseSettings> bookStoreDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            bookStoreDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            bookStoreDatabaseSettings.Value.DatabaseName);

        _categoriesCollection = mongoDatabase.GetCollection<Category>(
            bookStoreDatabaseSettings.Value.CategoriesCollectionName);

        _booksCollection = mongoDatabase.GetCollection<Book>(
            bookStoreDatabaseSettings.Value.BooksCollectionName);
    }

    public async Task<List<Category>> GetAsync() =>
        await _categoriesCollection.Find(_ => true).ToListAsync();

    public async Task<Category?> GetAsync(string id) =>
        await _categoriesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Category newCategory) =>
        await _categoriesCollection.InsertOneAsync(newCategory);

    public async Task UpdateAsync(string id, Category updatedCategory)
    {
        await _categoriesCollection.ReplaceOneAsync(x => x.Id == id, updatedCategory);
        var filter = Builders<Book>.Filter.Eq(x => x.Category.Id, id);
        var update = Builders<Book>.Update.Set(x => x.Category.CategoryName, updatedCategory.CategoryName);
        await _booksCollection.UpdateManyAsync(filter, update);
    }

    public async Task RemoveAsync(string id) =>
        await _categoriesCollection.DeleteOneAsync(x => x.Id == id);
}