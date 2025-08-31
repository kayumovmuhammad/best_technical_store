from fastapi import APIRouter, Depends
from typing import Annotated
from sqlalchemy.ext.asyncio import AsyncSession
from database.db import ItemsORM, get_session, CategoriesORM
from sqlalchemy import select, or_, and_, func
from functions.item_to_dict import item_to_dict
import os

info_router = APIRouter(prefix='/info')

SessionDep = Annotated[AsyncSession, Depends(get_session)]

@info_router.get("/categories")
async def get_categories(session: SessionDep):
    ITEM_COUNT_IN_PAGE=int(os.getenv("ITEM_COUNT_IN_PAGE"))
    
    categories = {}
    
    query = select(CategoriesORM)
    tm_data = await session.execute(query)
    data = tm_data.scalars().all()
    
    for category in data:
        categories[category.category] = (category.count + ITEM_COUNT_IN_PAGE - 1) // ITEM_COUNT_IN_PAGE
    
    return categories


@info_router.get("/data/part")
async def get_part_of_data(category: str, page: int, session: SessionDep):
    ITEM_COUNT_IN_PAGE=int(os.getenv("ITEM_COUNT_IN_PAGE"))
    MAIN_CATEGORY=os.getenv("MAIN_CATEGORY")
    page -= 1
    
    query = select(ItemsORM).where(((ItemsORM.category == category) | (category == MAIN_CATEGORY)) & ItemsORM.is_deleted == False)
    items_response = await session.execute(query)
    items = items_response.scalars().all()
    # print(items)
    items = items[page*ITEM_COUNT_IN_PAGE: min(len(items), (page+1) * ITEM_COUNT_IN_PAGE)]
    answer = []
    for item in items:
        answer.append(item_to_dict(item))
        
    print(answer, items) 
    return answer

@info_router.get("/search")
async def find_for_search(searchable: str, page: int, session: SessionDep):
    NAME_PRIORITY_WEIGHT=int(os.getenv("NAME_PRIORITY_WEIGHT"))
    ITEM_COUNT_IN_PAGE=int(os.getenv("ITEM_COUNT_IN_PAGE"))
    page -= 1
    
    answer = []
    searchable = searchable.lower()

    # print(searchable)

    query = select(ItemsORM).where(func.concat(ItemsORM.name, ItemsORM.description).ilike(f'%{searchable}%'))

    # print(query.compile(compile_kwargs={"literal_binds": True}))

    response = await session.execute(query)
    items = response.scalars().all()
    count = len(items)
    items = items[page*ITEM_COUNT_IN_PAGE: min(len(items), (page+1)*ITEM_COUNT_IN_PAGE)]

    for item in items:
        answer.append(item_to_dict(item))

    return {
        'data': answer,
        'pageCount': (count + ITEM_COUNT_IN_PAGE - 1) // ITEM_COUNT_IN_PAGE
    }
