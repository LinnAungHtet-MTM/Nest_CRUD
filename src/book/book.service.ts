import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async createBook(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  async getBook(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('No book with this id');
    }
    return book;
  }

  async updateBook(id: string, book: Book): Promise<Book> {
    const bookUpdate = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
    if (!bookUpdate) {
      throw new NotFoundException('No book with this id');
    }
    return bookUpdate;
  }

  async deleteBook(id: string): Promise<string> {
    await this.bookModel.findByIdAndDelete(id);
    return 'Book deleted successfully';
  }
}
