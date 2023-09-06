import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { createBookDto } from './dto/book.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Post()
  async create(@Body() book: createBookDto): Promise<Book> {
    return this.bookService.createBook(book);
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return this.bookService.getBook(id);
  }

  @Put(':id')
  async updateBookById(
    @Param('id') id: string,
    @Body() book: createBookDto,
  ): Promise<Book> {
    return this.bookService.updateBook(id, book);
  }

  @Delete(':id')
  async deleteBookById(@Param('id') id: string): Promise<string> {
    return this.bookService.deleteBook(id);
  }
}
