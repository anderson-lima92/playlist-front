import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlistForm!: FormGroup;
  playlists: any[] = [];
  playlistEncontrada: any = null;
  nomeBusca: string = '';
  nomeDeletar: string = '';
  generos: string[] = [];

  constructor(private fb: FormBuilder, private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.playlistForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      musicas: this.fb.array([this.novaMusica()])
    });

    this.carregarGeneros();
  }

  carregarGeneros(): void {
    this.playlistService.getGeneros().subscribe({
      next: (res) => {
        this.generos = res && res.length ? res : this.generosPadrao();
      },
      error: () => {
        this.generos = this.generosPadrao();
      }
    });
  }

  generosPadrao(): string[] {
    return ['Pop', 'Rock', 'Sertanejo', 'Funk', 'Axé', 'Eletrônica', 'Rap', 'Forró', 'MPB', 'Reggae', 'Pagode', 'Samba', 'Blues', 'Jazz', 'Clássica', 'Indie', 'K-Pop', 'Trap', 'Gospel', 'Brega', 'Country'];
  }

  get musicas(): FormArray {
    return this.playlistForm.get('musicas') as FormArray;
  }

  novaMusica(): FormGroup {
    return this.fb.group({
      titulo: [''],
      artista: [''],
      album: [''],
      ano: [''],
      genero: ['']
    });
  }

  addMusica(): void {
    this.musicas.push(this.novaMusica());
  }

  registrarPlaylist(): void {
    this.playlistService.registrarPlaylist(this.playlistForm.value).subscribe({
      next: () => {
        alert('Playlist registrada com sucesso!');
        this.playlistForm.reset();
        this.musicas.clear();
        this.addMusica();
      },
      error: (err) => alert(err.error?.message || 'Erro ao registrar playlist')
    });
  }

  buscarPlaylists(): void {
    this.playlistService.buscarPlaylists().subscribe({
      next: (res) => {
        this.playlists = res.data;
      },
      error: (err) => alert(err.error?.message || 'Erro ao buscar playlists')
    });
  }

  buscarPorNome(): void {
    this.playlistService.buscarPorNome(this.nomeBusca).subscribe({
      next: (res) => {
        this.playlistEncontrada = res.data;
      },
      error: (err) => {
        alert(err.error?.message || 'Playlist não encontrada');
        this.playlistEncontrada = null;
      }
    });
  }

  deletarPlaylist(): void {
    this.playlistService.deletarPlaylist(this.nomeDeletar).subscribe({
      next: () => {
        alert('Playlist deletada com sucesso!');
        this.nomeDeletar = '';
      },
      error: (err) => alert(err.error?.message || 'Erro ao deletar playlist')
    });
  }
}