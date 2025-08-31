from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy import select
# from pydantic import BaseModel
from database.db import ItemSchema, get_session, setup_database, engine, CategoriesORM
from sqlalchemy.ext.asyncio import AsyncSession
import json
from functions.item_to_dict import item_to_dict
from database.db import ItemsORM
import os

testing_router = APIRouter()


SessionDep = Annotated[AsyncSession, Depends(get_session)]


@testing_router.post('/init')
async def init(session: SessionDep):
    MAIN_CATEGORY=os.getenv("MAIN_CATEGORY")
    
    await setup_database()

    async with engine.begin() as conn:
        await conn.run_sync(lambda sync_conn: CategoriesORM.__table__.drop(sync_conn, checkfirst=True))
        await conn.run_sync(lambda sync_conn: CategoriesORM.__table__.create(sync_conn, checkfirst=True))
        
    session.add(CategoriesORM(
        category=MAIN_CATEGORY,
        count=0
    ))
    await session.commit()

    return {"status": "OK"}


@testing_router.put('/add')
async def add(items: list[ItemSchema], session: SessionDep):
    MAIN_CATEGORY=os.getenv("MAIN_CATEGORY")
    
    for item in items:
        add_item = ItemsORM(
            category=item.category,
            name=item.name,
            description=item.description,
            image_links=json.dumps(item.image_links, ensure_ascii=False, indent=4),
            price=item.price,
        )
        session.add(add_item)
        query = select(CategoriesORM).where(CategoriesORM.category == item.category)
        category = (await session.execute(query)).scalar_one_or_none()
        query = select(CategoriesORM).where(CategoriesORM.category == MAIN_CATEGORY)
        main_category = (await session.execute(query)).scalar_one_or_none()
        main_category.count += 1
        if category:
            category.count += 1
        else:
            session.add(CategoriesORM(
                    category=item.category, count=1
                )
            )
        
    await session.commit()
    
    return {"status": "OK"}


@testing_router.get("/get_item")
async def get_item(id: int, session: SessionDep):
    query = select(ItemsORM).filter(ItemsORM.id == id)
    response = await session.execute(query)
    answers_class = response.scalars().all()
    answers: list[dict] = []
    for item in answers_class:
        answers.append(item_to_dict(item))

    return answers
