import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import orphanageView from '../views/orphanages_view';

import Orphanage from '../models/Orphanage';

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(orphanageView.render(orphanage));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;
  
    const orphanagesRepository = getRepository(Orphanage);
  
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path : image.filename }
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório.'),
      latitude: Yup.number().required('Latitude obrigatório.'),
      longitude: Yup.number().required('Longitude obrigatório.'),
      about: Yup.string().required('Informações sobre o orfanato obrigatório.').max(300),
      instructions: Yup.string().required('Instruções de visitação obrigatório.'),
      opening_hours: Yup.string().required('Horas aberto obrigatório.'),
      open_on_weekends: Yup.boolean().required('Aberto aos fins de semana obrigatório.'),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required('Url da imagem obrigatório.')
      }))
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);
  
    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  },

  async update(request: Request, response: Response) {
    const {
      id,
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;
  
    const orphanagesRepository = getRepository(Orphanage);
  
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path : image.filename }
    });

    const data = {
      id,
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório.'),
      latitude: Yup.number().required('Latitude obrigatório.'),
      longitude: Yup.number().required('Longitude obrigatório.'),
      about: Yup.string().required('Informações sobre o orfanato obrigatório.').max(300),
      instructions: Yup.string().required('Instruções de visitação obrigatório.'),
      opening_hours: Yup.string().required('Horas aberto obrigatório.'),
      open_on_weekends: Yup.boolean().required('Aberto aos fins de semana obrigatório.'),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required('Url da imagem obrigatório.')
      }))
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = await orphanagesRepository.findOne(id);

    console.log(orphanage)

    if(orphanage) {
      orphanagesRepository.merge(orphanage, data);
      await orphanagesRepository.save(orphanage);

      return response.status(200).json(orphanage);
    }

    /*const orphanage = await orphanagesRepository.findOne(id);

    if(orphanage) {
      const upOrphanage = await orphanagesRepository.update(orphanage,data);
      await orphanagesRepository.save(upOrphanage);
      return response.status(200).json(upOrphanage);
    }*/

    return response.status(404).json({msg:'Nao auterado.'});
  },

  async delete(request: Request, response: Response) { 
    const { id } = request.params;

    console.log(id);

    const orphanagesRepository = getRepository(Orphanage);

    //https://www.youtube.com/watch?v=pCxL1sdjeCc
    orphanagesRepository.delete(id);

    return response.status(204).json({msg:'Apagado'});
  }
}